import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface VitalEntry {
  timestamp: string;
  email: string;
  patientName: string;
  type: string;
  value: number;
  unit: string;
  notes?: string;
}

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private sheets;
  private spreadsheetId: string;
  private sheetName = 'Vitals';
  private oauth2Client: OAuth2Client;
  private static refreshToken: string | null = null;

  private constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL
    );

    if (!GoogleSheetsService.refreshToken) {
      throw new Error('Refresh token not set. Please authenticate as app owner first.');
    }

    this.oauth2Client.setCredentials({
      refresh_token: GoogleSheetsService.refreshToken
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.oauth2Client });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  }

  public static setRefreshToken(token: string) {
    GoogleSheetsService.refreshToken = token;
  }

  public static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  private async ensureSpreadsheet() {
    try {
      // Try to get the spreadsheet
      await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });
    } catch (error: any) {
      if (error?.response?.status === 404) {
        console.log('Spreadsheet not found, creating new one...');
        // Spreadsheet doesn't exist, create a new one
        const response = await this.sheets.spreadsheets.create({
          requestBody: {
            properties: {
              title: 'Health Vitals Tracker',
            },
            sheets: [
              {
                properties: {
                  title: this.sheetName,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
              },
            ],
          },
        });

        this.spreadsheetId = response.data.spreadsheetId!;
        console.log('Created new spreadsheet with ID:', this.spreadsheetId);
        
        // Add headers to the new sheet
        const headers = [
          ['Timestamp', 'Email', 'Patient Name', 'Vital Type', 'Value', 'Unit', 'Notes']
        ];
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${this.sheetName}!A1:G1`,
          valueInputOption: 'RAW',
          requestBody: { values: headers },
        });
      } else {
        throw error;
      }
    }
  }

  private async ensureVitalsSheet() {
    try {
      await this.ensureSpreadsheet();

      // Get the spreadsheet metadata
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      // Check if Vitals sheet exists
      const vitalsSheet = response.data.sheets?.find(
        sheet => sheet.properties?.title === this.sheetName
      );

      if (!vitalsSheet) {
        console.log('Vitals sheet not found, creating new one...');
        // Create the Vitals sheet with headers
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: this.sheetName,
                    gridProperties: {
                      frozenRowCount: 1,
                    },
                  },
                },
              },
            ],
          },
        });

        // Add headers
        const headers = [
          ['Timestamp', 'Email', 'Patient Name', 'Vital Type', 'Value', 'Unit', 'Notes']
        ];
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${this.sheetName}!A1:G1`,
          valueInputOption: 'RAW',
          requestBody: { values: headers },
        });
      }
    } catch (error) {
      console.error('Error ensuring Vitals sheet exists:', error);
      throw new Error('Failed to ensure Vitals sheet exists');
    }
  }

  async addVitalEntry(vital: VitalEntry) {
    try {
      console.log('Adding vital entry:', vital);
      
      // Ensure the Vitals sheet exists
      await this.ensureVitalsSheet();

      const values = [[
        vital.timestamp,
        vital.email,
        vital.patientName,
        vital.type,
        vital.value,
        vital.unit,
        vital.notes || ''
      ]];

      console.log('Writing values to sheet:', values);

      const result = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A2`,
        valueInputOption: 'RAW',
        requestBody: { values },
      });

      console.log('Append result:', result.data);
      return this.spreadsheetId;
    } catch (error) {
      console.error('Error adding vital entry:', error);
      throw new Error('Failed to add vital entry to spreadsheet');
    }
  }

  async getVitalEntries(patientEmail?: string) {
    try {
      await this.ensureVitalsSheet();

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A:G`,
      });

      const rows = response.data.values || [];
      if (patientEmail) {
        // Filter rows by patient email if provided
        return rows.filter(row => row[1] === patientEmail);
      }
      return rows;
    } catch (error) {
      console.error('Error getting vital entries:', error);
      throw new Error('Failed to get vital entries from spreadsheet');
    }
  }
}
