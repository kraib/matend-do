"use server"

// This is a mock database. In a real application, you'd use a proper database.
const vitalsDatabase: any[] = []

export async function submitVital(prevState: any, formData: FormData) {
  try {
    const vitalType = formData.get("vitalType") as string
    const vitalValue = formData.get("vitalValue") as string

    if (!vitalType || !vitalValue) {
      return { success: false, message: "Please fill in all required fields." }
    }

    const newVital = {
      [vitalType]: vitalValue,
      date: new Date().toISOString(),
    }

    vitalsDatabase.push(newVital)

    return { success: true, message: `${vitalType} submitted successfully!` }
  } catch (error) {
    console.error("Error submitting vital:", error)
    return { success: false, message: "An error occurred while submitting the vital." }
  }
}

