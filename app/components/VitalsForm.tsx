"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { submitVital } from "../actions/submitVital"
import VitalSelector from "./VitalSelector"

type VitalType = "bloodPressure" | "heartRate" | "temperature" | "oxygenSaturation"

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

  return (
    <form action={formAction} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{getVitalTitle(selectedVital)}</h2>

      <VitalSelector selectedVital={selectedVital} onSelect={setSelectedVital} />

      <div>
        <label htmlFor={selectedVital} className="block text-sm font-medium text-gray-700">
          {getVitalTitle(selectedVital)} Value
        </label>
        <input
          type={getInputType(selectedVital)}
          id={selectedVital}
          name="vitalValue"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder={getPlaceholder(selectedVital)}
          step={selectedVital === "temperature" ? "0.1" : "1"}
        />
      </div>

      <input type="hidden" name="vitalType" value={selectedVital} />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Submit Vital
      </button>

      {state?.message && (
        <p className={`mt-4 text-center ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
      )}
    </form>
  )
}

