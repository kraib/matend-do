export type VitalType =
  // Vitals
  | "bloodPressure"
  | "heartRate"
  | "respiratoryRate"
  | "oxygenSaturation"
  | "temperature"
  | "weight"
  | "height"
  | "bmi"
  | "bloodSugar"
  // Activity & Hydration
  | "dailySteps"
  | "exerciseDuration"
  | "waterIntake"
  // Pain & Emotion
  | "painLevel"
  | "painDuration"
  | "mood"
  | "stress"
  | "fatigue"
  // Sleep & Rest
  | "sleepDuration"
  | "sleepQuality"
  | "timesWokenUp"
  // General Well-being
  | "energyLevel"
  | "appetite"
  // Labs & Biomarkers
  | "hba1c"
  | "sodium"
  | "potassium"
  | "calcium"
  | "magnesium"
  | "cholesterol"
  | "ldl"
  | "hdl"
  | "triglycerides"
  | "hemoglobin"
  | "wbc"
  | "rbc"
  | "platelets"
  | "tsh"
  | "freeT3"
  | "freeT4"
  | "alt"
  | "ast"
  | "alp"
  | "bilirubin"
  | "creatinine"
  | "bun"
  | "crp"
  | "esr"
  | "ferritin"
  | "vitaminD"
  | "vitaminB12"
  | "cea"
  | "afp"
  | "ca125"
  | "ca153"
  | "psa"
  | "bhcg"
  | "ldh"
  | "hpg80"
  // Infection Markers
  | "cd4"
  | "viralLoad"
  // Treatments
  | "morphineDose"
  | "insulinLantusDose"
  | "actrapidDose"; // Insulin Actrapid Dose added

export interface VitalInfo {
  type: VitalType;
  label: string;
  unit: string;
}

export const VITALS_LIST: VitalInfo[] = [
  // Vitals
  { type: "bloodPressure", label: "Blood Pressure (BP)", unit: "mmHg" },
  { type: "heartRate", label: "Heart Rate (HR)", unit: "bpm" },
  { type: "respiratoryRate", label: "Respiratory Rate (RR)", unit: "breaths/min" },
  { type: "oxygenSaturation", label: "Oxygen Saturation (SpO₂)", unit: "%" },
  { type: "temperature", label: "Body Temperature", unit: "°C" },
  { type: "weight", label: "Weight", unit: "kg" },
  { type: "height", label: "Height", unit: "cm" },
  { type: "bmi", label: "Body Mass Index (BMI)", unit: "" },
  { type: "bloodSugar", label: "Blood Sugar (Glucose)", unit: "mmol/L" },

  // Activity & Hydration
  { type: "dailySteps", label: "Daily Steps", unit: "steps" },
  { type: "exerciseDuration", label: "Exercise Duration", unit: "hours" },
  { type: "waterIntake", label: "Water Intake", unit: "ml" },

  // Pain & Emotion
  { type: "painLevel", label: "Pain Level", unit: "scale (0-10)" },
  { type: "painDuration", label: "Pain Duration", unit: "hours" },
  { type: "mood", label: "Mood Rating", unit: "scale (0-10)" },
  { type: "stress", label: "Stress Level", unit: "scale (0-10)" },
  { type: "fatigue", label: "Fatigue Level", unit: "scale (0-10)" },

  // Sleep & Rest
  { type: "sleepDuration", label: "Sleep Duration", unit: "hours" },
  { type: "sleepQuality", label: "Sleep Quality Rating", unit: "scale (0-10)" },
  { type: "timesWokenUp", label: "Times Woken Up", unit: "times" },

  // General Well-being
  { type: "energyLevel", label: "Energy Level", unit: "scale (0-10)" },
  { type: "appetite", label: "Appetite", unit: "scale (0-10)" },

  // Labs & Biomarkers
  { type: "hba1c", label: "HbA1c", unit: "%" },
  { type: "sodium", label: "Sodium", unit: "mmol/L" },
  { type: "potassium", label: "Potassium", unit: "mmol/L" },
  { type: "calcium", label: "Calcium", unit: "mmol/L" },
  { type: "magnesium", label: "Magnesium", unit: "mmol/L" },
  { type: "cholesterol", label: "Total Cholesterol", unit: "mmol/L" },
  { type: "ldl", label: "LDL Cholesterol", unit: "mmol/L" },
  { type: "hdl", label: "HDL Cholesterol", unit: "mmol/L" },
  { type: "triglycerides", label: "Triglycerides", unit: "mmol/L" },
  { type: "hemoglobin", label: "Hemoglobin", unit: "g/dL" },
  { type: "wbc", label: "White Blood Cells", unit: "10⁹/L" },
  { type: "rbc", label: "Red Blood Cells", unit: "10¹²/L" },
  { type: "platelets", label: "Platelets", unit: "10⁹/L" },
  { type: "tsh", label: "TSH", unit: "mIU/L" },
  { type: "freeT3", label: "Free T3", unit: "pmol/L" },
  { type: "freeT4", label: "Free T4", unit: "pmol/L" },
  { type: "alt", label: "ALT", unit: "U/L" },
  { type: "ast", label: "AST", unit: "U/L" },
  { type: "alp", label: "ALP", unit: "U/L" },
  { type: "bilirubin", label: "Bilirubin", unit: "µmol/L" },
  { type: "creatinine", label: "Creatinine", unit: "µmol/L" },
  { type: "bun", label: "BUN", unit: "mmol/L" },
  { type: "crp", label: "CRP", unit: "mg/L" },
  { type: "esr", label: "ESR", unit: "mm/hr" },
  { type: "ferritin", label: "Ferritin", unit: "µg/L" },
  { type: "vitaminD", label: "Vitamin D", unit: "nmol/L" },
  { type: "vitaminB12", label: "Vitamin B12", unit: "pmol/L" },
  { type: "cea", label: "CEA", unit: "µg/L" },
  { type: "afp", label: "AFP", unit: "µg/L" },
  { type: "ca125", label: "CA 125", unit: "U/mL" },
  { type: "ca153", label: "CA 15-3", unit: "U/mL" },
  { type: "psa", label: "PSA", unit: "µg/L" },
  { type: "bhcg", label: "β-hCG", unit: "IU/L" },
  { type: "ldh", label: "LDH", unit: "U/L" },
  { type: "hpg80", label: "hPG80", unit: "ng/L" },

  // Infection Markers
  { type: "cd4", label: "CD4 Count", unit: "cells/µL" },
  { type: "viralLoad", label: "Viral Load", unit: "copies/mL" },

  // Treatments
  { type: "morphineDose", label: "Morphine Dose", unit: "mg" },
  { type: "insulinLantusDose", label: "Insulin Lantus Dose", unit: "units" },
  { type: "actrapidDose", label: "Insulin Actrapid Dose", unit: "units" }
];
