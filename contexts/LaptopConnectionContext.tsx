import { createContext, useContext, ReactNode, useState, useRef } from "react";
import { LaptopConnection } from "../types/ui/LaptopConnection";
import { useTokens } from "./TokensContext";

interface LaptopConnectionContextType {
  error: string | null;
  setError: (error: string | null) => void;
  socket: WebSocket | null;
  connect: (ipAddress: string, port: string, name: string) => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  laptopConnection: LaptopConnection | null;
  isConnected: boolean;
  isLoading: boolean;
}

export const LaptopConnectionContext = createContext<
  LaptopConnectionContextType | undefined
>(undefined);

export function LaptopConnectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { accessToken } = useTokens();
  const [error, setError] = useState<string | null>(null);
  const [laptopConnection, setLaptopConnection] =
    useState<LaptopConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = (ipAddress: string, port: string, name: string) => {
    try {
      setError(null);
      socketRef.current = new WebSocket(`ws://${ipAddress}:${port}`);
      // Update laptop info with connecting status
      setLaptopConnection({
        id: Date.now().toString(),
        name: name,
        ipAddress,
        port,
        lastConnected: new Date().toLocaleString(),
        connectionStatus: "connecting",
      });

      socketRef.current.onopen = () => {
        // Connected to WebSocket
        setError(null);
        // Update only the connection status
        setLaptopConnection((prev) =>
          prev
            ? {
                ...prev,
                connectionStatus: "connected",
                lastConnected: new Date().toLocaleString(),
              }
            : null
        );
        // Send access token to laptop
        sendMessage("access_token:"+accessToken);
      };

      socketRef.current.onclose = () => {
        setLaptopConnection((prev) =>
          prev
            ? {
                ...prev,
                connectionStatus: "disconnected",
              }
            : null
        );
      };

      socketRef.current.onerror = (event) => {
        setError("WebSocket error occurred");
        setLaptopConnection((prev) =>
          prev
            ? {
                ...prev,
                connectionStatus: "disconnected",
              }
            : null
        );
      };

      socketRef.current.onmessage = (event) => {
        // Handle incoming messages if needed
      };
    } catch (err) {
      setError("Failed to construct WebSocket");
      setLaptopConnection(null);
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setLaptopConnection(null);
    }
  };

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      setError("Cannot send message:\nWebSocket is not connected");
    }
  };

  const value = {
    error,
    setError,
    socket: socketRef.current,
    connect,
    disconnect,
    sendMessage,
    laptopConnection,
    get isConnected() {
      return laptopConnection?.connectionStatus === "connected";
    },
    get isLoading() {
      return laptopConnection?.connectionStatus === "connecting";
    },
  };

  return (
    <LaptopConnectionContext.Provider value={value}>
      {children}
    </LaptopConnectionContext.Provider>
  );
}

export function useLaptopConnection() {
  const context = useContext(LaptopConnectionContext);
  if (context === undefined) {
    throw new Error(
      "useLaptopConnection must be used within a LaptopConnectionProvider"
    );
  }
  return context;
}
