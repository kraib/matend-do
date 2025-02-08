import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export class GoogleDriveService {
  private static instance: GoogleDriveService;
  private drive;
  private oauth2Client: OAuth2Client;
  private static refreshToken: string | null = null;

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

  async ensurePatientFolder(patientEmail: string): Promise<string> {
    try {
      // Search for existing folder
      const response = await this.drive.files.list({
        q: `name = '${patientEmail}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive',
      });

      if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id!;
      }

      // Create new folder if it doesn't exist
      const fileMetadata = {
        name: patientEmail,
        mimeType: 'application/vnd.google-apps.folder',
      };

      const folder = await this.drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      return folder.data.id!;
    } catch (error) {
      console.error('Error in ensurePatientFolder:', error);
      throw new Error('Failed to create or find patient folder');
    }
  }

  async uploadFile(
    folderId: string,
    file: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<string> {
    try {
      const fileMetadata = {
        name: fileName,
        parents: [folderId],
      };

      const media = {
        mimeType,
        body: file,
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });

      return response.data.id!;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }
}
