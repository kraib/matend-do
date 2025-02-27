"use server";

import { getServerSession } from "next-auth";
import { HealthRecordsService } from "@/lib/services/health-records.service";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { GoogleDriveService } from "@/lib/services/google-drive.service";
import { GoogleSheetsService } from "@/lib/services/google-sheets.service";
import { vitalValidators, allowedVitalTypes } from "../../lib/validators/vital-validators";

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
    console.log(vitalType, vitalValue, unit, notes);

    if (!vitalType || !vitalValue || !unit) {
      return { success: false, message: "Please fill in all required fields." };
    }

    if (!allowedVitalTypes.includes(vitalType)) {
      return { 
        success: false, 
        message: `Invalid vital type: ${vitalType}. Please select from the available options.` 
      };
    }

    // Get the appropriate validator for this vital type
    const validator = vitalValidators[vitalType];
    
    // For blood pressure, keep the original string value
    const parsedValue = vitalType === "bloodPressure" ? vitalValue : parseFloat(vitalValue);
    
    if (typeof parsedValue === "number" && isNaN(parsedValue)) {
      console.log("Invalid vital value:", vitalValue);
      return { success: false, message: "Invalid vital value" };
    }

    // Validate the value
    const validationResult = validator.validate(parsedValue);
    if (!validationResult.isValid) {
      console.log("Validation error:", validationResult.message);
      return { success: false, message: validationResult.message };
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
