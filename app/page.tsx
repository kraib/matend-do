"use client"

import { useState } from "react"
import VitalsForm from "./components/VitalsForm"
import UploadForm from "./components/UploadForm"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"vitals" | "upload">("vitals")

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Health Records Management</h1>

      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "vitals"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("vitals")}
            >
              Capture Vitals
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "upload"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              Upload History
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-8">{activeTab === "vitals" ? <VitalsForm /> : <UploadForm />}</div>
    </div>
  )
}

