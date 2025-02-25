"use client";

import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import VitalsForm from "./components/VitalsForm";
import UploadForm from "./components/UploadForm";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Register required chart scales
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
  const [activeTab, setActiveTab] = useState<"vitals" | "upload" | "dashboard">("vitals");
  const [vitalData, setVitalData] = useState<any[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const chartRef = useRef<HTMLDivElement>(null); // Captures the chart

  useEffect(() => {
    if (activeTab === "dashboard") {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/vitals");
          if (!response.ok) throw new Error("Failed to fetch data");
          const data = await response.json();
          setVitalData(data);
          generateAISummary(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [activeTab]);

  const generateAISummary = (data: any[]) => {
    if (!data.length) return setAiSummary("No data available for analysis.");
    const lastEntry = data[data.length - 1];
    setAiSummary(`Recent trends indicate a ${lastEntry.trend || "stable"} pattern in vitals.`);
  };

  const availableMetrics = vitalData.length
    ? Object.keys(vitalData[0]).filter((key) => key !== "date" && key !== "trend")
    : [];

  const chartData = selectedMetric
    ? {
        labels: vitalData.map((entry) => entry.date),
        datasets: [
          {
            label: selectedMetric.replace(/([A-Z])/g, " $1").trim(),
            data: vitalData.map((entry) => entry[selectedMetric]),
            borderColor: "blue",
            fill: false,
          },
        ],
      }
    : null;

  const generatePDF = async () => {
    if (!selectedMetric) return alert("Please select a metric before downloading.");

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold"); // Fixed Font Error
    doc.setFontSize(16);
    doc.text("Vital Trends Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Trend Analysis for ${selectedMetric.replace(/([A-Z])/g, " $1").trim()}`, 14, 30);
    doc.setFontSize(10);
    doc.text(aiSummary || "Analyzing data...", 14, 40);

    // Capture Chart as Image
    if (chartRef.current) {
      await html2canvas(chartRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 15, 50, 180, 80);
      });
    }

    // Generate Table Data
    const tableData = vitalData.map((entry) => [entry.date, entry[selectedMetric] || "N/A"]);

    autoTable(doc, {
      startY: 140,
      head: [["Date", selectedMetric.replace(/([A-Z])/g, " $1").trim()]],
      body: tableData,
    });

    // Save the PDF
    doc.save(`Vital-Trend-${selectedMetric}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Health Records Management</h1>

      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {["vitals", "upload", "dashboard"].map((tab) => (
            <li key={tab} className="mr-2">
              <button
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-gray-600 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab as "vitals" | "upload" | "dashboard")}
              >
                {tab === "vitals" ? "Capture Vitals" : tab === "upload" ? "Upload History" : "Dashboard"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        {activeTab === "vitals" ? (
          <VitalsForm />
        ) : activeTab === "upload" ? (
          <UploadForm />
        ) : (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Vitals Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <label className="font-semibold">Select a Metric:</label>
                    <select
                      className="ml-2 p-2 border rounded-md"
                      value={selectedMetric || ""}
                      onChange={(e) => setSelectedMetric(e.target.value)}
                    >
                      <option value="">-- Select a metric --</option>
                      {availableMetrics.map((metric) => (
                        <option key={metric} value={metric}>
                          {metric.replace(/([A-Z])/g, " $1").trim()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button onClick={() => setViewMode(viewMode === "chart" ? "table" : "chart")}>
                    {viewMode === "chart" ? "Switch to Table View" : "Switch to Chart View"}
                  </Button>
                </div>

                {viewMode === "chart" && selectedMetric && chartData ? (
                  <div ref={chartRef}>
                    <Line data={chartData} />
                  </div>
                ) : viewMode === "table" && selectedMetric ? (
                  <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">{selectedMetric.replace(/([A-Z])/g, " $1").trim()}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitalData.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                          <td className="border border-gray-300 px-4 py-2">{entry[selectedMetric]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Select a metric to display data.</p>
                )}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{aiSummary || "Analyzing data..."}</p>
                <Button onClick={generatePDF} className="bg-green-600 text-white">Download PDF</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
