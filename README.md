# Health Vitals Tracker

A modern web application for tracking health vitals with Google Sheets integration. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🔐 Secure Google OAuth authentication
- 📊 Track multiple vital types:
  - Blood Pressure
  - Heart Rate
  - Temperature
  - Blood Sugar
  - Weight
  - Oxygen Saturation
- 📝 Add notes to each vital reading
- 📈 Data stored in Google Sheets for easy access and analysis
- 🎨 Clean, modern UI with responsive design
- 🌙 Patient-centric data organization

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later
- npm or yarn
- A Google Cloud Project with:
  - Google OAuth 2.0 configured
  - Google Sheets API enabled
  - Google Drive API enabled

## Environment Setup

Create a `.env.local` file in the root directory with:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_SHEET_ID=your_google_sheet_id
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/health-vitals-tracker.git
cd health-vitals-tracker
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
health-vitals-tracker/
├── app/                    # Next.js 14 app directory
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── layout.tsx         # Root layout
├── lib/
│   ├── services/          # Service layer
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
- **File Storage**: Google Drive API
- **Form Handling**: React Server Actions
- **State Management**: React Context

## Features in Detail

### Authentication
- Google OAuth 2.0 integration
- Secure session management
- Protected routes and API endpoints

### Vital Tracking
- Support for multiple vital types
- Validation for each vital type
- Unit conversion and standardization
- Optional notes for context

### Google Integration
- Automatic spreadsheet creation
- Patient-specific folder organization
- Real-time data synchronization

### User Interface
- Responsive design for all devices
- Form validation and error handling
- Loading states and feedback
- Clean and intuitive navigation

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
- The open-source community for inspiration and tools
