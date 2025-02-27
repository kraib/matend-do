interface VitalValidator {
  validate(value: number | string): { isValid: boolean; message?: string };
}

class BloodPressureValidator implements VitalValidator {
  validate(value: string) {
    if (!value.includes("/")) {
      return { isValid: false, message: "Blood pressure must be in format '120/80'" };
    }
    const [systolic, diastolic] = value.split("/").map(v => parseFloat(v));
    if (isNaN(systolic) || isNaN(diastolic)) {
      return { isValid: false, message: "Invalid blood pressure values" };
    }
    if (systolic < 70 || systolic > 200 || diastolic < 40 || diastolic > 130) {
      return { isValid: false, message: "Blood pressure values out of normal range" };
    }
    return { isValid: true };
  }
}

class NumericRangeValidator implements VitalValidator {
  constructor(
    private min: number,
    private max: number,
    private unit: string
  ) {}

  validate(value: number) {
    if (value < this.min || value > this.max) {
      return { 
        isValid: false, 
        message: `Value should be between ${this.min}-${this.max} ${this.unit}` 
      };
    }
    return { isValid: true };
  }
}

class ScaleValidator implements VitalValidator {
  validate(value: number) {
    if (value < 0 || value > 10) {
      return { isValid: false, message: "Value should be between 0-10" };
    }
    return { isValid: true };
  }
}

export const vitalValidators: Record<string, VitalValidator> = {
  bloodPressure: new BloodPressureValidator(),
  heartRate: new NumericRangeValidator(40, 200, "bpm"),
  temperature: new NumericRangeValidator(35, 42, "°C"),
  oxygenSaturation: new NumericRangeValidator(80, 100, "%"),
  respiratoryRate: new NumericRangeValidator(8, 40, "breaths/min"),
  weight: new NumericRangeValidator(0, 500, "kg"),
  height: new NumericRangeValidator(0, 300, "cm"),
  bloodSugar: new NumericRangeValidator(0, 33, "mmol/L"),
  waterIntake: new NumericRangeValidator(0, 10000, "ml"),
  sleepDuration: new NumericRangeValidator(0, 24, "hours"),
  exerciseDuration: new NumericRangeValidator(0, 24, "hours"),
  painDuration: new NumericRangeValidator(0, 24, "hours"),
  dailySteps: new NumericRangeValidator(0, 100000, "steps"),
  timesWokenUp: new NumericRangeValidator(0, 50, "times"),
  bmi: new NumericRangeValidator(10, 50, ""),
  painLevel: new ScaleValidator(),
  stress: new ScaleValidator(),
  fatigue: new ScaleValidator(),
  sleepQuality: new ScaleValidator(),
  energyLevel: new ScaleValidator(),
  mood: new ScaleValidator(),
  appetite: new ScaleValidator(),
  // Labs & Biomarkers
  hba1c: new NumericRangeValidator(3, 15, "%"),
  sodium: new NumericRangeValidator(120, 150, "mmol/L"),
  potassium: new NumericRangeValidator(2.5, 7, "mmol/L"),
  calcium: new NumericRangeValidator(1.5, 3, "mmol/L"),
  magnesium: new NumericRangeValidator(0.5, 2, "mmol/L"),
  cholesterol: new NumericRangeValidator(0, 15, "mmol/L"),
  ldl: new NumericRangeValidator(0, 10, "mmol/L"),
  hdl: new NumericRangeValidator(0, 5, "mmol/L"),
  triglycerides: new NumericRangeValidator(0, 10, "mmol/L"),
  hemoglobin: new NumericRangeValidator(5, 20, "g/dL"),
  wbc: new NumericRangeValidator(0, 50, "x10⁹/L"),
  rbc: new NumericRangeValidator(2, 7, "x10¹²/L"),
  platelets: new NumericRangeValidator(20, 500, "x10⁹/L"),
  tsh: new NumericRangeValidator(0, 20, "mIU/L"),
  freeT3: new NumericRangeValidator(0, 10, "pmol/L"),
  freeT4: new NumericRangeValidator(0, 30, "pmol/L"),
  alt: new NumericRangeValidator(0, 500, "U/L"),
  ast: new NumericRangeValidator(0, 500, "U/L"),
  alp: new NumericRangeValidator(0, 500, "U/L"),
  bilirubin: new NumericRangeValidator(0, 100, "μmol/L"),
  creatinine: new NumericRangeValidator(0, 1500, "μmol/L"),
  bun: new NumericRangeValidator(0, 50, "mmol/L"),
  crp: new NumericRangeValidator(0, 300, "mg/L"),
  esr: new NumericRangeValidator(0, 150, "mm/hr"),
  ferritin: new NumericRangeValidator(0, 2000, "μg/L"),
  vitaminD: new NumericRangeValidator(0, 200, "nmol/L"),
  vitaminB12: new NumericRangeValidator(0, 1500, "pmol/L"),
  cea: new NumericRangeValidator(0, 100, "μg/L"),
  afp: new NumericRangeValidator(0, 1000, "μg/L"),
  ca125: new NumericRangeValidator(0, 1000, "U/mL"),
  ca153: new NumericRangeValidator(0, 500, "U/mL"),
  psa: new NumericRangeValidator(0, 100, "μg/L"),
  bhcg: new NumericRangeValidator(0, 200000, "IU/L"),
  ldh: new NumericRangeValidator(0, 1000, "U/L"),
  hpg80: new NumericRangeValidator(0, 100, "U/mL"),
  // Infection Markers
  cd4: new NumericRangeValidator(0, 2000, "cells/μL"),
  viralLoad: new NumericRangeValidator(0, 1000000, "copies/mL"),
  // Treatments
  morphineDose: new NumericRangeValidator(0, 100, "mg"),
  insulinLantusDose: new NumericRangeValidator(0, 100, "units"),
  actrapidDose: new NumericRangeValidator(0, 100, "units")
};

export const allowedVitalTypes = Object.keys(vitalValidators);
