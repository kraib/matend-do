"use server"

import { put } from "@vercel/blob"

// This is a mock database. In a real application, you'd use a proper database.
const filesDatabase: any[] = []

export async function uploadFile(prevState: any, formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, message: "Please select a file to upload." }
    }

    const blob = await put(`patient-history/${Date.now()}.pdf`, file, {
      access: "public",
    })

    const newFile = {
      url: blob.url,
      date: new Date().toISOString(),
    }

    filesDatabase.push(newFile)

    return { success: true, message: "File uploaded successfully!" }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { success: false, message: "An error occurred while uploading the file." }
  }
}

