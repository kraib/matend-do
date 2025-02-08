'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VitalType = "bloodPressure" | "heartRate" | "temperature" | "oxygenSaturation"

interface VitalSelectorProps {
  selectedVital: VitalType
  onSelect: (vital: VitalType) => void
  disabled?: boolean
}

const vitals: { type: VitalType; label: string }[] = [
  { type: "bloodPressure", label: "Blood Pressure" },
  { type: "heartRate", label: "Heart Rate" },
  { type: "temperature", label: "Temperature" },
  { type: "oxygenSaturation", label: "Oxygen Saturation" },
]

export default function VitalSelector({ selectedVital, onSelect, disabled }: VitalSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {vitals.map((vital) => (
        <button
          key={vital.type}
          onClick={() => onSelect(vital.type)}
          disabled={disabled}
          type="button"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedVital === vital.type 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {vital.label}
        </button>
      ))}
    </div>
  )
}
