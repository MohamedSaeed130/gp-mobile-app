import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as meAPI from "../api/meAPI";
import { useTokens } from "./TokensContext";
import { Notification } from "../types/api/Notifications";

interface NotificationsContextValue {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  refreshNotifications: () => Promise<void>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(
  undefined
);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useTokens();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refresh notifications and update context
  const refreshNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const { notifications: notifArr } = await meAPI.fetchMyNotifications(
        { page: 1, size: 50 },
        accessToken
      );
      setNotifications(notifArr || []);
    } catch (e: any) {
      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        loading,
        error,
        refreshNotifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error("useNotifications must be used within a NotificationsProvider");
  return ctx;
};
