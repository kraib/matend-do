"use client";

import { useState, useEffect } from "react";
import { VitalType, VITALS_LIST } from "./types";

interface VitalSelectorProps {
  selectedVital: VitalType;
  onSelect: (vital: VitalType) => void;
  disabled?: boolean;
}

// ✅ Properly grouping VITALS_LIST into categories
const vitalsGrouped: { category: string; vitals: { type: VitalType; label: string }[] }[] = [
  {
    category: "Vitals",
    vitals: VITALS_LIST.filter((vital) =>
      [
        "bloodPressure",
        "heartRate",
        "respiratoryRate",
        "oxygenSaturation",
        "temperature",
        "weight",
        "height",
        "bmi",
        "bloodSugar",
      ].includes(vital.type)
    ),
  },
  {
    category: "Activity & Hydration",
    vitals: VITALS_LIST.filter((vital) =>
      ["dailySteps", "exerciseDuration", "waterIntake"].includes(vital.type)
    ),
  },
  {
    category: "Pain & Emotion",
    vitals: VITALS_LIST.filter((vital) =>
      ["painLevel", "painDuration", "mood", "stress", "fatigue"].includes(vital.type)
    ),
  },
  {
    category: "Sleep & Rest",
    vitals: VITALS_LIST.filter((vital) =>
      ["sleepDuration", "sleepQuality", "timesWokenUp"].includes(vital.type)
    ),
  },
  {
    category: "General Well-being",
    vitals: VITALS_LIST.filter((vital) =>
      ["energyLevel", "appetite"].includes(vital.type)
    ),
  },
  {
    category: "Labs & Biomarkers",
    vitals: VITALS_LIST.filter((vital) =>
      [
        "hba1c",
        "sodium",
        "potassium",
        "calcium",
        "magnesium",
        "cholesterol",
        "ldl",
        "hdl",
        "triglycerides",
        "hemoglobin",
        "wbc",
        "rbc",
        "platelets",
        "tsh",
        "freeT3",
        "freeT4",
        "alt",
        "ast",
        "alp",
        "bilirubin",
        "creatinine",
        "bun",
        "vitaminD",
        "vitaminB12",
        "cea",
        "afp",
        "ca125",
        "ca153",
        "psa",
        "bhcg",
        "ldh",
        "hpg80",
      ].includes(vital.type)
    ),
  },
  {
    category: "Infection Markers",
    vitals: VITALS_LIST.filter((vital) =>
      ["cd4", "viralLoad", "crp", "esr", "ferritin"].includes(vital.type)
    ),
  },
  {
    category: "Treatments", // ✅ Ensuring "Treatments" is the LAST category
    vitals: VITALS_LIST.filter((vital) =>
      ["morphineDose", "insulinLantusDose", "actrapidDose"].includes(vital.type)
    ),
  },
];

export default function VitalSelector({ selectedVital, onSelect, disabled }: VitalSelectorProps) {
  const [activeVital, setActiveVital] = useState<VitalType>(selectedVital);

  useEffect(() => {
    setActiveVital(selectedVital); // Sync state when prop updates
  }, [selectedVital]);

  const handleSelection = (e: React.MouseEvent, vital: VitalType) => {
    e.preventDefault(); // Prevent form submission
    setActiveVital(vital);
    onSelect(vital); // Ensures the parent state updates
  };

  return (
    <div className="space-y-4 overflow-y-auto max-h-96 p-2 border rounded-md">
      {vitalsGrouped.map(({ category, vitals }) => (
        <div key={category}>
          <h3 className="font-semibold text-lg mb-2">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {vitals.map((vital) => (
              <button
                key={vital.type}
                onClick={(e) => handleSelection(e, vital.type)}
                disabled={disabled}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeVital === vital.type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {vital.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
