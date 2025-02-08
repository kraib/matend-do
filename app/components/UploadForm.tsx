"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { uploadFile } from "../actions/uploadFile"

export default function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, null)
  const [file, setFile] = useState<File | null>(null)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Patient History File (PDF)
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".pdf"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Upload File
      </button>
      {state?.message && (
        <p className={`mt-4 text-center ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
      )}
    </form>
  )
}

