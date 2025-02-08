import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Readable } from 'stream';

interface UploadFileParams {
  name: string;
  mimeType: string;
  buffer: Buffer;
}

interface PatientInfo {
  name: string;
  email: string;
}

export class GoogleDriveService {
  private static instance: GoogleDriveService;
  private drive;
  private oauth2Client: OAuth2Client;
  private static refreshToken: string | null = null;
  private baseFolderName = 'Matendo Vitals Records';

  private constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL
    );

    if (!GoogleDriveService.refreshToken) {
      throw new Error('Refresh token not set. Please authenticate as app owner first.');
    }

    this.oauth2Client.setCredentials({
      refresh_token: GoogleDriveService.refreshToken
    });

    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  public static setRefreshToken(token: string) {
    GoogleDriveService.refreshToken = token;
  }

  public static getInstance(): GoogleDriveService {
    if (!GoogleDriveService.instance) {
      GoogleDriveService.instance = new GoogleDriveService();
    }
    return GoogleDriveService.instance;
  }

  private async findOrCreateFolder(folderName: string, parentId?: string): Promise<string> {
    try {
      // Search for existing folder
      let query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
      if (parentId) {
        query += ` and '${parentId}' in parents`;
      }

      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name)',
        spaces: 'drive',
      });

      if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id!;
      }

      // Create new folder if it doesn't exist
      const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : undefined,
      };

      const folder = await this.drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      return folder.data.id!;
    } catch (error) {
      console.error('Error in findOrCreateFolder:', error);
      throw new Error('Failed to create or find folder');
    }
  }

  async ensurePatientFolder(patient: PatientInfo): Promise<string> {
    try {
      // First, ensure base folder exists
      const baseFolderId = await this.findOrCreateFolder(this.baseFolderName);
      console.log('Base folder ID:', baseFolderId);

      // Create folder name with patient name and email
      const folderName = `${patient.name} (${patient.email})`;

      // Then create/find patient folder inside base folder
      const patientFolderId = await this.findOrCreateFolder(folderName, baseFolderId);
      console.log('Patient folder ID:', patientFolderId);

      return patientFolderId;
    } catch (error) {
      console.error('Error in ensurePatientFolder:', error);
      throw new Error('Failed to create or find patient folder');
    }
  }

  async uploadFile(file: UploadFileParams, patient: PatientInfo): Promise<string> {
    try {
      // Ensure patient folder exists
      const folderId = await this.ensurePatientFolder(patient);

      // Create file metadata
      const fileMetadata = {
        name: file.name,
        parents: [folderId],
      };

      // Create readable stream from buffer
      const readable = new Readable();
      readable._read = () => {}; // _read is required but you can noop it
      readable.push(file.buffer);
      readable.push(null);

      // Create media
      const media = {
        mimeType: file.mimeType,
        body: readable,
      };

      // Upload file
      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink',
      });

      return response.data.id!;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }
}
