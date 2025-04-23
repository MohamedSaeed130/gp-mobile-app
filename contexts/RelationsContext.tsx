import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as meAPI from "../api/meAPI";
import { useTokens } from "./TokensContext";
import { Relation } from "../types/api/Relations";

interface RelationsContextValue {
  relations: Relation[];
  loading: boolean;
  error: string | null;
  refreshRelations: () => Promise<void>;
  setRelations: React.Dispatch<React.SetStateAction<Relation[]>>;
}

const RelationsContext = createContext<RelationsContextValue | undefined>(
  undefined
);

export const RelationsProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useTokens();
  const [relations, setRelations] = useState<Relation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRelations = async () => {
    setLoading(true);
    setError(null);
    try {
      const newRelations = await meAPI.fetchMyRelations(accessToken);
      setRelations(newRelations || []);
    } catch (e: any) {
      setError("Failed to fetch relations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <RelationsContext.Provider
      value={{
        relations,
        loading,
        error,
        refreshRelations: fetchRelations,
        setRelations,
      }}
    >
      {children}
    </RelationsContext.Provider>
  );
};

export const useRelations = () => {
  const ctx = useContext(RelationsContext);
  if (!ctx)
    throw new Error("useRelations must be used within a RelationsProvider");
  return ctx;
};
