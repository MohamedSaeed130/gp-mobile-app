export type Duration = "hour" | "day" | "week";

export interface VitalStat {
  timestamp: Date;
  heartRate: number;
  bloodOxygen: number;
  temperature: number;
}

export interface VitalStatsResponse {
  userId: number;
  size: number;
  duration: Duration;
  vitalStats: VitalStat[];
}
