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
  | "actrapidDose"; // ✅ Insulin Actrapid Dose added

export const VITALS_LIST: { type: VitalType; label: string }[] = [
  // Vitals
  { type: "bloodPressure", label: "Blood Pressure (BP)" },
  { type: "heartRate", label: "Heart Rate (HR)" },
  { type: "respiratoryRate", label: "Respiratory Rate (RR)" },
  { type: "oxygenSaturation", label: "Oxygen Saturation (SpO₂)" },
  { type: "temperature", label: "Body Temperature (°C)" },
  { type: "weight", label: "Weight (kg)" },
  { type: "height", label: "Height (cm)" },
  { type: "bmi", label: "Body Mass Index (BMI)" },
  { type: "bloodSugar", label: "Blood Sugar (Glucose)" },

  // Activity & Hydration
  { type: "dailySteps", label: "Daily Steps" },
  { type: "exerciseDuration", label: "Exercise Duration (minutes)" },
  { type: "waterIntake", label: "Water Intake (Liters per day)" },

  // Pain & Emotion
  { type: "painLevel", label: "Pain Level (0-10 Scale)" },
  { type: "painDuration", label: "Pain Duration (Minutes)" },
  { type: "mood", label: "Mood Rating (0-100)" },
  { type: "stress", label: "Stress Level (0-100 Scale)" },
  { type: "fatigue", label: "Fatigue Level (0-100 Scale)" },

  // Sleep & Rest
  { type: "sleepDuration", label: "Sleep Duration (Hours)" },
  { type: "sleepQuality", label: "Sleep Quality Rating (0-10 Scale)" },
  { type: "timesWokenUp", label: "Times Woken Up" },

  // General Well-being
  { type: "energyLevel", label: "Energy Level (0-10 Scale)" },
  { type: "appetite", label: "Appetite Level (0-10)" },

  // Labs & Biomarkers
  { type: "hba1c", label: "HbA1c (%)" },
  { type: "sodium", label: "Sodium (mEq/L)" },
  { type: "potassium", label: "Potassium (mEq/L)" },
  { type: "calcium", label: "Calcium (mg/dL)" },
  { type: "magnesium", label: "Magnesium (mg/dL)" },
  { type: "cholesterol", label: "Total Cholesterol (mg/dL)" },
  { type: "ldl", label: "LDL Cholesterol (mg/dL)" },
  { type: "hdl", label: "HDL Cholesterol (mg/dL)" },
  { type: "triglycerides", label: "Triglycerides (mg/dL)" },
  { type: "hemoglobin", label: "Hemoglobin (g/dL)" },
  { type: "wbc", label: "White Blood Cells (10⁹/L)" },
  { type: "rbc", label: "Red Blood Cells (10¹²/L)" },
  { type: "platelets", label: "Platelet Count (10⁹/L)" },
  { type: "tsh", label: "Thyroid-Stimulating Hormone (TSH) (mIU/L)" },
  { type: "freeT3", label: "Free T3 (pg/mL)" },
  { type: "freeT4", label: "Free T4 (ng/dL)" },
  { type: "alt", label: "Alanine Aminotransferase (ALT) (U/L)" },
  { type: "ast", label: "Aspartate Aminotransferase (AST) (U/L)" },
  { type: "alp", label: "Alkaline Phosphatase (ALP) (U/L)" },
  { type: "bilirubin", label: "Bilirubin (mg/dL)" },
  { type: "creatinine", label: "Creatinine (mg/dL)" },
  { type: "bun", label: "Blood Urea Nitrogen (BUN) (mg/dL)" },
  { type: "crp", label: "C-Reactive Protein (CRP) (mg/L)" },
  { type: "esr", label: "Erythrocyte Sedimentation Rate (ESR) (mm/hr)" },
  { type: "ferritin", label: "Ferritin (ng/mL)" },
  { type: "vitaminD", label: "Vitamin D (ng/mL)" },
  { type: "vitaminB12", label: "Vitamin B12 (pg/mL)" },

  // Tumor Markers
  { type: "cea", label: "Carcinoembryonic Antigen (CEA) (ng/mL)" },
  { type: "afp", label: "Alpha-Fetoprotein (AFP) (ng/mL)" },
  { type: "ca125", label: "CA-125 (U/mL) - Ovarian Cancer Marker" },
  { type: "ca153", label: "CA-15-3 (U/mL) - Breast Cancer Marker" },
  { type: "psa", label: "Prostate-Specific Antigen (PSA) (ng/mL)" },
  { type: "bhcg", label: "Beta-HCG (mIU/mL) - Pregnancy/Testicular Cancer" },
  { type: "ldh", label: "Lactate Dehydrogenase (LDH) (U/L)" },
  { type: "hpg80", label: "hPG80 Tumor Marker (ng/mL)" },

  // Infection Markers
  { type: "cd4", label: "CD4 Count (cells/uL)" },
  { type: "viralLoad", label: "HIV Viral Load (copies/mL)" },

  // Treatments
  { type: "morphineDose", label: "Morphine Dose (mg)" },
  { type: "insulinLantusDose", label: "Insulin Lantus Dose (IU)" },
  { type: "actrapidDose", label: "Insulin Actrapid Dose (IU)" },
];
