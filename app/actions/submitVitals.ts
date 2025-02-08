"use server"

import { revalidatePath } from "next/cache"

// This is a mock database. In a real application, you'd use a proper database.
const vitalsDatabase: any[] = []

export async function submitVitals(prevState: any, formData: FormData) {
  try {
    const patientId = formData.get("patientId") as string
    const bloodPressure = formData.get("bloodPressure") as string
    const heartRate = formData.get("heartRate") as string
    const temperature = formData.get("temperature") as string

    if (!patientId || !bloodPressure || !heartRate || !temperature) {
      return { success: false, message: "Please fill in all required fields." }
    }

    const newVitals = {
      patientId,
      bloodPressure,
      heartRate,
      temperature,
      date: new Date().toISOString(),
    }

    vitalsDatabase.push(newVitals)

    revalidatePath("/history")
    return { success: true, message: "Vitals submitted successfully!" }
  } catch (error) {
    console.error("Error submitting vitals:", error)
    return { success: false, message: "An error occurred while submitting vitals." }
  }
}

