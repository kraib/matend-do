# Google Cloud Console Setup Guide

This guide will walk you through setting up the necessary Google Cloud configurations for the Matendo Vitals Tracker application.

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "Matendo Vitals Tracker")
5. Click "Create"

## 2. Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - Google Drive API
   - Google Sheets API
3. Click "Enable" for each API

## 3. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you have a Google Workspace)
3. Fill in the required information:
   - App name: "Matendo Vitals Tracker"
   - User support email: Your email
   - Developer contact information: Your email
4. Click "Save and Continue"
5. Add the following scopes:
   - `.../auth/drive` (Full Drive access)
   - `.../auth/spreadsheets` (View and manage spreadsheets)
6. Click "Save and Continue"
7. Add test users (your email and any other users who need access)
8. Click "Save and Continue"

## 4. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Set the name to "Matendo Vitals Tracker Web Client"
5. Add Authorized JavaScript origins:
   ```
   http://localhost:3000
   http://YOUR_IP_ADDRESS:3000 (for local network access)
   ```
6. Add Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   http://YOUR_IP_ADDRESS:3000/api/auth/callback/google (for local network access)
   ```
7. Click "Create"
8. Save the Client ID and Client Secret (you'll need these for the .env.local file)

## 5. Get Refresh Token Using OAuth Playground

1. Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Click the gear icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your OAuth credentials:
   - OAuth Client ID: Your client ID
   - OAuth Client Secret: Your client secret
5. Close the settings
6. Select these scopes:
   ```
   https://www.googleapis.com/auth/drive
   https://www.googleapis.com/auth/spreadsheets
   ```
7. Click "Authorize APIs"
8. Sign in with your Google account
9. Click "Exchange authorization code for tokens"
10. Copy the "Refresh token" (you'll need this for the .env.local file)

## 6. Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=generate_a_random_string_here
NEXTAUTH_URL=http://localhost:3000
APP_OWNER_REFRESH_TOKEN=your_refresh_token_here
```

## Troubleshooting

### Common Issues:

1. **"Error 400: redirect_uri_mismatch"**
   - Double-check that your redirect URIs exactly match what's in the Google Cloud Console
   - Include both localhost and IP address versions if needed

2. **"Error 401: invalid_client"**
   - Verify your client ID and secret are correct
   - Make sure you're using the right credentials in the OAuth Playground

3. **"Error: insufficient_scope"**
   - Return to the OAuth consent screen and ensure all required scopes are added
   - Re-authorize in the OAuth Playground with all required scopes

### Security Notes:

1. Never commit your `.env.local` file to version control
2. Keep your refresh token secure - it provides long-term access to your Google account
3. Regularly rotate your credentials if you suspect they've been compromised

## Additional Resources

- [Google Cloud Console Documentation](https://cloud.google.com/docs)
- [OAuth 2.0 Playground Documentation](https://developers.google.com/oauthplayground)
- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
