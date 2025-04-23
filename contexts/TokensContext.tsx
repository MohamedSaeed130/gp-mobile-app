import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Tokens } from "../types/api/Auth";
import * as authAPI from "../api/authAPI";

interface TokensContextType {
  tokens: Tokens | undefined;
  setTokens: React.Dispatch<React.SetStateAction<Tokens | undefined>>;
  accessToken: string;
}

const TokensContext = createContext<TokensContextType | undefined>(undefined);

export const TokensProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<Tokens | undefined>(undefined);
  const accessToken = tokens?.accessToken as string;

  // Timer ref to keep track of refresh timeout
  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any previous timer
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }
    if (!tokens?.refreshToken || !tokens?.expiresIn) return;

    // Refresh 30 seconds before expiry, fallback to half expiry if short
    const refreshIn = Math.max(
      (tokens.expiresIn - 30) * 1000,
      tokens.expiresIn * 500
    );
    refreshTimeout.current = setTimeout(async () => {
      try {
        const refreshed = await authAPI.refresh(tokens.refreshToken!);
        setTokens((prev) => (prev ? { ...prev, ...refreshed } : prev));
      } catch (err) {
        // On refresh error, logout (clear tokens)
        setTokens(undefined);
      }
    }, refreshIn);
    return () => {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    };
  }, [tokens?.refreshToken, tokens?.expiresIn]);

  return (
    <TokensContext.Provider value={{ tokens, setTokens, accessToken }}>
      {children}
    </TokensContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokensContext);
  if (!context) {
    throw new Error("useTokens must be used within a TokensProvider");
  }
  return context;
};
