export interface LaptopConnection {
  id: string;
  name: string;
  ipAddress: string;
  port: string;
  lastConnected: string;
  connectionStatus: "connected" | "disconnected" | "connecting";
} 