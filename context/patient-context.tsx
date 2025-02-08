"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface PatientContextType {
  patientName: string | null;
  setPatientName: (name: string | null) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patientName, setPatientName] = useState<string | null>(null);

  return (
    <PatientContext.Provider value={{ patientName, setPatientName }}>
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
