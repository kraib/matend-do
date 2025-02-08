import { GoogleDriveService } from './google-drive.service';
import { GoogleSheetsService } from './google-sheets.service';

export class HealthRecordsService {
  private driveService: GoogleDriveService;
  private sheetsService: GoogleSheetsService;
  private patientEmail: string;

  constructor(accessToken: string, patientEmail: string) {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    if (!patientEmail) {
      throw new Error('Patient email is required');
    }

    this.driveService = new GoogleDriveService(accessToken);
    this.sheetsService = new GoogleSheetsService(accessToken);
    this.patientEmail = patientEmail;
  }

  async recordVitalWithAttachments(vital: {
    patientName: string;
    type: string;
    value: number;
    unit: string;
    notes?: string;
  }) {
    try {
      // Ensure patient folder exists
      const folderId = await this.driveService.ensurePatientFolder(this.patientEmail);
      console.log('Patient folder ID:', folderId);

      // Record vital in spreadsheet
      const vitalEntry = {
        timestamp: new Date().toISOString(),
        email: this.patientEmail,
        patientName: vital.patientName,
        type: vital.type,
        value: vital.value,
        unit: vital.unit,
        notes: vital.notes || ''
      };

      console.log('Recording vital entry:', vitalEntry);
      const spreadsheetId = await this.sheetsService.addVitalEntry(vitalEntry);
      console.log('Vital recorded in spreadsheet:', spreadsheetId);

      return { folderId, spreadsheetId };
    } catch (error) {
      console.error('Error recording vital with attachments:', error);
      throw new Error('Failed to record vital entry with attachments');
    }
  }

  async getPatientVitals(): Promise<any[]> {
    return this.sheetsService.getVitalEntries(this.patientEmail);
  }
}
