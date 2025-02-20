import { useEffect, useCallback } from 'react';

export const useConnectionSafety = (
  isConnected: boolean,
  onDisconnect: () => void,
  stopMovement: () => void
) => {
  const handleConnectionLoss = useCallback(() => {
    stopMovement();
    onDisconnect();
  }, [stopMovement, onDisconnect]);

  useEffect(() => {
    if (!isConnected) {
      handleConnectionLoss();
    }
  }, [isConnected, handleConnectionLoss]);
}; 