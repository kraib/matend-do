import { getVitalsHistory, getUploadedFiles } from "../actions/getHistory"

export default async function History() {
  const vitals = await getVitalsHistory()
  const files = await getUploadedFiles()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Patient History</h1>

      <h2 className="text-2xl font-semibold mb-4">Vitals History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Patient ID</th>
              <th className="py-2 px-4 border">Vital Type</th>
              <th className="py-2 px-4 border">Value</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map((vital, index) => {
              const vitalType = Object.keys(vital).find((key) =>
                ["bloodPressure", "heartRate", "temperature", "oxygenSaturation"].includes(key),
              )
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border">{vital.patientId}</td>
                  <td className="py-2 px-4 border">{vitalType}</td>
                  <td className="py-2 px-4 border">{vital[vitalType]}</td>
                  <td className="py-2 px-4 border">{new Date(vital.date).toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold my-8">Uploaded Files</h2>
      <ul className="list-disc pl-5">
        {files.map((file, index) => (
          <li key={index} className="mb-2">
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {file.patientId} - {new Date(file.date).toLocaleString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

