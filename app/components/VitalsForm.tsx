"use client";

import { useState } from "react";
import { submitVital } from "../actions/submitVital";
import VitalSelector from "./VitalSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { VitalType, VITALS_LIST } from "./types"; // ✅ Importing from types.ts

export default function VitalsForm() {
  const [selectedVital, setSelectedVital] = useState<VitalType>("bloodPressure");
  const [inputValue, setInputValue] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('unit', VITALS_LIST.find(vital => vital.type === selectedVital)?.unit || "");

    // Call the submitVital action
    submitVital(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <VitalSelector
        selectedVital={selectedVital}
        onSelect={(vital) => {
          setSelectedVital(vital);
          setInputValue(""); // Reset input when changing selection
        }}
      />

      <Label>{selectedVital.replace(/([A-Z])/g, " $1").trim()} Value</Label>
      <Input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={`Enter ${selectedVital.replace(/([A-Z])/g, " $1").trim()} value`}
      />

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Add any additional notes here..."
          className="mt-1"
        />
      </div>

      <input type="hidden" name="vitalType" value={selectedVital} />

      <Button type="submit">Submit</Button>
    </form>
  );
}
