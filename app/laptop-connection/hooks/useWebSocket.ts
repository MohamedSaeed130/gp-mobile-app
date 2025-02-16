import { useState, useCallback, useEffect } from 'react';

interface WebSocketHook {
  connect: (ipAddress: string, port: string) => void;
  disconnect: () => void;
  isConnected: boolean;
  isLoading: boolean;
  statusMessage: string;
  socket: WebSocket | null;
}

export const useWebSocket = (): WebSocketHook => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Not connected');

  const connect = useCallback((ipAddress: string, port: string) => {
    if (socket) {
      socket.close();
    }

    setIsLoading(true);
    setStatusMessage('Connecting...');

    try {
      const ws = new WebSocket(`ws://${ipAddress}:${port}`);
      
      ws.onopen = () => {
        setIsConnected(true);
        setIsLoading(false);
        setStatusMessage('Connected successfully');
        setSocket(ws);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsLoading(false);
        setStatusMessage('Connection closed');
        setSocket(null);
      };

      ws.onerror = (error) => {
        setIsConnected(false);
        setIsLoading(false);
        setStatusMessage('Connection failed');
        setSocket(null);
      };

    } catch (error) {
      setIsConnected(false);
      setIsLoading(false);
      setStatusMessage('Connection failed');
      setSocket(null);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
      setStatusMessage('Disconnected');
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return {
    connect,
    disconnect,
    isConnected,
    isLoading,
    statusMessage,
    socket,
  };
}; 