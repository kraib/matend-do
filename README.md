# Matendo Vitals Tracker

A modern, secure health vitals tracking application that stores patient data in Google Sheets. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🔐 Secure Google OAuth authentication
- 📊 Track multiple vital types with real-time validation:
  - Blood Pressure (mmHg)
  - Heart Rate (bpm)
  - Temperature (°C)
  - Oxygen Saturation (%)
- 📝 Add notes to each vital reading
- 📈 Centralized data storage in Google Sheets for easy access and analysis
- 🎨 Modern UI with responsive design and loading states
- 🌙 Patient-centric data organization
- 🔄 Real-time form validation and feedback
- 🚀 Server-side data processing with Next.js Server Actions

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later
- npm or yarn
- A Google Cloud Project with:
  - Google OAuth 2.0 configured
  - Google Sheets API enabled
  - Google Drive API enabled
  - OAuth consent screen configured
  - Authorized redirect URIs set up

## Environment Setup

Create a `.env.local` file in the root directory with:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_SHEET_ID=your_google_sheet_id
APP_OWNER_REFRESH_TOKEN=your_refresh_token
```

## Google Cloud Setup

1. Create a new project in Google Cloud Console
2. Enable the following APIs:
   - Google Sheets API
   - Google Drive API
3. Configure OAuth consent screen:
   - Add required scopes:
     - `https://www.googleapis.com/auth/drive`
     - `https://www.googleapis.com/auth/spreadsheets`
4. Create OAuth 2.0 credentials:
   - Add authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://your-production-domain.com/api/auth/callback/google
     ```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/matendo-vitals-tracker.git
cd matendo-vitals-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
matendo-vitals-tracker/
├── app/                    # Next.js 14 app directory
│   ├── actions/           # Server actions for form handling
│   ├── api/               # API routes including auth
│   ├── components/        # React components
│   └── layout.tsx         # Root layout
├── lib/
│   ├── services/          # Google API services
│   └── utils/             # Utility functions
├── public/                # Static files
└── types/                 # TypeScript type definitions
```

## Key Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS
- **Data Storage**: Google Sheets API
- **Form Handling**: React Server Actions
- **State Management**: React Context & Server Actions
- **UI Components**: Shadcn/ui

## Features in Detail

### Authentication
- Google OAuth 2.0 integration
- Secure session management
- Protected routes and API endpoints

### Vital Tracking
- Support for multiple vital types with appropriate units
- Real-time form validation
- Loading states during submission
- Automatic unit conversion and standardization
- Optional notes for context

### Google Integration
- Centralized spreadsheet for all patient data
- Secure access through app owner's credentials
- Real-time data synchronization
- Automatic sheet creation and management

### User Interface
- Responsive design for all devices
- Interactive vital type selection with pill buttons
- Form validation and error handling
- Loading states and user feedback
- Clean and intuitive navigation

## Security Features

- OAuth 2.0 authentication
- Server-side data processing
- Secure credential management
- Protected API routes
- CSRF protection
- Secure session handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Next.js team for the amazing framework
- Google Cloud Platform for APIs
- Shadcn/ui for beautiful components
- The open-source community for inspiration and tools
