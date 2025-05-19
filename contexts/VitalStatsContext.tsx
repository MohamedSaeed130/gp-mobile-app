import React, { createContext, useContext, useState, ReactNode } from "react";

interface VitalStats {
  temperature: number | null;
  bloodOxygen: number | null;
  heartRate: number | null;
  setTemperature: (value: number | null) => void;
  setBloodOxygen: (value: number | null) => void;
  setHeartRate: (value: number | null) => void;
}

const VitalStatsContext = createContext<VitalStats | undefined>(undefined);

export const VitalStatsProvider = ({ children }: { children: ReactNode }) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [bloodOxygen, setBloodOxygen] = useState<number | null>(null);
  const [heartRate, setHeartRate] = useState<number | null>(null);

  return (
    <VitalStatsContext.Provider
      value={{
        temperature,
        bloodOxygen,
        heartRate,
        setTemperature,
        setBloodOxygen,
        setHeartRate,
      }}
    >
      {children}
    </VitalStatsContext.Provider>
  );
};

export const useVitalStats = () => {
  const context = useContext(VitalStatsContext);
  if (context === undefined) {
    throw new Error("useVitalStats must be used within a VitalStatsProvider");
  }
  return context;
};
