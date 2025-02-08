"use server"

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { GoogleDriveService } from '@/lib/services/google-drive.service';

// This is a mock database. In a real application, you'd use a proper database.
const filesDatabase: any[] = []

export async function uploadFile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.name) {
      return { success: false, error: 'User not authenticated or missing information' };
    }

    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      return { success: false, error: 'No file provided' };
    }

    // Convert file to buffer for Google Drive upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Initialize Google Drive service with app owner's refresh token
    GoogleDriveService.setRefreshToken(process.env.APP_OWNER_REFRESH_TOKEN!);
    const driveService = GoogleDriveService.getInstance();

    // Upload file to user's folder with patient info
    const fileId = await driveService.uploadFile(
      {
        name: file.name,
        mimeType: file.type,
        buffer: buffer,
      },
      {
        name: session.user.name,
        email: session.user.email,
      }
    );

    const newFile = {
      fileId,
      date: new Date().toISOString(),
    }

    filesDatabase.push(newFile)

    return { success: true, fileId };
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return { success: false, error: 'Failed to upload file' };
  }
}
