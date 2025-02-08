"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { submitVital } from "../actions/submitVital"
import VitalSelector from "./VitalSelector"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type VitalType = "bloodPressure" | "heartRate" | "temperature" | "oxygenSaturation"

interface VitalUnit {
  unit: string;
  min: number;
  max: number;
}

const VITAL_CONFIGS: Record<VitalType, VitalUnit> = {
  bloodPressure: { unit: "mmHg", min: 0, max: 300 },
  heartRate: { unit: "bpm", min: 0, max: 300 },
  temperature: { unit: "°F", min: 80, max: 120 },
  oxygenSaturation: { unit: "%", min: 0, max: 100 },
};

export default function VitalsForm() {
  const [state, formAction] = useFormState(submitVital, null)
  const [selectedVital, setSelectedVital] = useState<VitalType>("bloodPressure")

  const getInputType = (vitalType: VitalType): string => {
    switch (vitalType) {
      case "bloodPressure":
        return "text"
      case "heartRate":
      case "oxygenSaturation":
        return "number"
      case "temperature":
        return "number"
      default:
        return "text"
    }
  }

  const getPlaceholder = (vitalType: VitalType): string => {
    switch (vitalType) {
      case "bloodPressure":
        return "120/80"
      case "heartRate":
        return "72"
      case "temperature":
        return "98.6"
      case "oxygenSaturation":
        return "98"
      default:
        return ""
    }
  }

  const getVitalTitle = (vitalType: VitalType): string => {
    switch (vitalType) {
      case "bloodPressure":
        return "Blood Pressure"
      case "heartRate":
        return "Heart Rate"
      case "temperature":
        return "Temperature"
      case "oxygenSaturation":
        return "Oxygen Saturation"
      default:
        return ""
    }
  }

  const handleSubmit = async (formData: FormData) => {
    // Append unit
    formData.append('unit', VITAL_CONFIGS[selectedVital].unit)
    
    // Submit the form
    formAction(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">{getVitalTitle(selectedVital)}</h2>

      <VitalSelector selectedVital={selectedVital} onSelect={setSelectedVital} />

      <div className="space-y-4">
        <div>
          <Label htmlFor={selectedVital}>
            {getVitalTitle(selectedVital)} Value ({VITAL_CONFIGS[selectedVital].unit})
          </Label>
          <Input
            type={getInputType(selectedVital)}
            id={selectedVital}
            name="vitalValue"
            required
            className="mt-1"
            placeholder={getPlaceholder(selectedVital)}
            step={selectedVital === "temperature" ? "0.1" : "1"}
            min={VITAL_CONFIGS[selectedVital].min}
            max={VITAL_CONFIGS[selectedVital].max}
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Add any additional notes here..."
            className="mt-1"
          />
        </div>
      </div>

      <input type="hidden" name="vitalType" value={selectedVital} />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Submit Vital
      </button>

      {state?.message && (
        <p className={`mt-4 text-center ${state.success ? "text-green-600" : "text-red-600"}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}
