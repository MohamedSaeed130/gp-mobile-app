export interface ActivityCardData {
  icon: React.ReactNode;
  value: number;
  unit: string;
  label: string;
}

export type MovementType = 'forward' | 'backward' | 'left' | 'right' | 'stop';
export type ConnectionStatus = 'connected' | 'disconnected'; 