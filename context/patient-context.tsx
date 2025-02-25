"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface PatientContextType {
  patientName: string | null;
  setPatientName: (name: string | null) => void;
  vitals: Record<string, number | null>;
  setVitals: (vitals: Record<string, number | null>) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patientName, setPatientName] = useState<string | null>(null);
  const [vitals, setVitals] = useState<Record<string, number | null>>({
    weight: null,
    height: null,
    bloodSugar: null,
  });

  return (
    <PatientContext.Provider value={{ patientName, setPatientName, vitals, setVitals }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
}
