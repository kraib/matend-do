"use server"

import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export async function submitHealthData(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const age = formData.get("age") as string
    const bloodPressure = formData.get("bloodPressure") as string
    const heartRate = formData.get("heartRate") as string
    const temperature = formData.get("temperature") as string
    const file = formData.get("file") as File

    // Basic validation
    if (!name || !age || !bloodPressure || !heartRate || !temperature) {
      return { success: false, message: "Please fill in all required fields." }
    }

    let fileUrl = ""
    if (file.size > 0) {
      const blob = await put(`patient-history/${name}-${Date.now()}.pdf`, file, {
        access: "public",
      })
      fileUrl = blob.url
    }

    // Here you would typically save the data to a database
    // For this example, we'll just log it
    console.log({
      name,
      age,
      bloodPressure,
      heartRate,
      temperature,
      fileUrl,
    })

    revalidatePath("/")
    return { success: true, message: "Health data submitted successfully!" }
  } catch (error) {
    console.error("Error submitting health data:", error)
    return { success: false, message: "An error occurred while submitting health data." }
  }
}

