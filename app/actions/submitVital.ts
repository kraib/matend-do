"use server";

import { getServerSession } from "next-auth";
import { HealthRecordsService } from "@/lib/services/health-records.service";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { GoogleDriveService } from "@/lib/services/google-drive.service";
import { GoogleSheetsService } from "@/lib/services/google-sheets.service";

// Initialize services with app owner's refresh token
const APP_OWNER_REFRESH_TOKEN = process.env.APP_OWNER_REFRESH_TOKEN;
if (APP_OWNER_REFRESH_TOKEN) {
  GoogleDriveService.setRefreshToken(APP_OWNER_REFRESH_TOKEN);
  GoogleSheetsService.setRefreshToken(APP_OWNER_REFRESH_TOKEN);
}

export async function submitVital(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !session?.user?.name) {
      return { 
        success: false, 
        message: "You must be logged in to submit vitals." 
      };
    }

    const vitalType = formData.get("vitalType") as string;
    const vitalValue = formData.get("vitalValue") as string;
    const unit = formData.get("unit") as string;
    const notes = formData.get("notes") as string;

    if (!vitalType || !vitalValue || !unit) {
      return { success: false, message: "Please fill in all required fields." };
    }

    let parsedValue: number;
    
    if (vitalType === "bloodPressure") {
      const systolic = parseFloat(vitalValue.split("/")[0]);
      if (isNaN(systolic)) {
        return { success: false, message: "Invalid blood pressure value." };
      }
      parsedValue = systolic;
    } else {
      parsedValue = parseFloat(vitalValue);
      if (isNaN(parsedValue)) {
        return { success: false, message: "Invalid vital value." };
      }
    }

    console.log("Creating HealthRecordsService with:", {
      email: session.user.email
    });

    const healthRecords = new HealthRecordsService(session.user.email);

    console.log("Recording vital:", {
      patientName: session.user.name,
      type: vitalType,
      value: parsedValue,
      unit,
      notes
    });

    // Record the vital
    const result = await healthRecords.recordVitalWithAttachments({
      patientName: session.user.name,
      type: vitalType,
      value: parsedValue,
      unit,
      notes,
    });

    console.log("Vital recorded successfully:", result);

    return { 
      success: true, 
      message: `${vitalType} recorded successfully!` 
    };
  } catch (error) {
    console.error("Error submitting vital:", error);
    return { 
      success: false, 
      message: "An error occurred while submitting the vital. Please try again." 
    };
  }
}
