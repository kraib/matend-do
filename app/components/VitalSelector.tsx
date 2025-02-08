type VitalType = "bloodPressure" | "heartRate" | "temperature" | "oxygenSaturation"

interface VitalSelectorProps {
  selectedVital: VitalType
  onSelect: (vital: VitalType) => void
}

const vitals: { type: VitalType; label: string }[] = [
  { type: "bloodPressure", label: "Blood Pressure" },
  { type: "heartRate", label: "Heart Rate" },
  { type: "temperature", label: "Temperature" },
  { type: "oxygenSaturation", label: "Oxygen Saturation" },
]

export default function VitalSelector({ selectedVital, onSelect }: VitalSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {vitals.map((vital) => (
        <button
          key={vital.type}
          onClick={() => onSelect(vital.type)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedVital === vital.type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {vital.label}
        </button>
      ))}
    </div>
  )
}

