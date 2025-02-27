"use client";

import { useState, useRef } from "react";
import { submitVital } from "../actions/submitVital";
import VitalSelector from "./VitalSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { VitalType, VITALS_LIST } from "./types";

export default function VitalsForm() {
  const [selectedVital, setSelectedVital] = useState<VitalType>("bloodPressure");
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('vitalType', selectedVital);
      formData.append('vitalValue', inputValue);
      formData.append('unit', VITALS_LIST.find(vital => vital.type === selectedVital)?.unit || "");
      formData.append('notes', notesRef.current?.value || "");
      
      // Call the submitVital action
      const result = await submitVital({}, formData);
      if (!result.success) {
        setError(result.message);
      } else {
        // Clear form on success
        setInputValue("");
        if (notesRef.current) {
          notesRef.current.value = "";
        }
        setSuccess(result.message);
      }
    } catch (err) {
      debugger
      console.log("err", err)
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the current vital's unit for display
  const currentVital = VITALS_LIST.find(vital => vital.type === selectedVital);
  const unit = currentVital?.unit || "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <VitalSelector
        selectedVital={selectedVital}
        onSelect={(vital) => {
          setSelectedVital(vital);
          setInputValue(""); // Reset input when changing selection
          setError(null); // Clear any previous errors
          setSuccess(null); // Clear success message
        }}
        disabled={isSubmitting}
      />

      <div className="space-y-2">
        <Label>{currentVital?.label || selectedVital}</Label>
        <div className="flex items-center gap-2">
          <Input
            type={selectedVital === "bloodPressure" ? "text" : "number"}
            name="vitalValue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={selectedVital === "bloodPressure" ? "e.g., 120/80" : "Enter value"}
            className="flex-1"
            disabled={isSubmitting}
          />
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          ref={notesRef}
          placeholder="Add any additional notes here..."
          className="mt-1"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
