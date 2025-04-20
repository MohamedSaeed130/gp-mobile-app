import { RefreshedTokens, Tokens } from "../types/api/Auth";
import { UserLogin, UserRegistration } from "../types/api/Users";
import API_BASE_URL from "./constants/API_BASE_URL";

const auth = async <R>(path: string, payload: unknown): Promise<R> => {
  const response = await fetch(`${API_BASE_URL}/auth/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (body.status !== "success") throw new Error();

  return body.data;
};

export const register = async (registration: UserRegistration) =>
  await auth("register", registration);

export const login = async (login: UserLogin) =>
  await auth<Tokens>("login", login);

export const logout = async (accessToken: string) =>
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const refresh = async (refreshToken: string) =>
  await auth<RefreshedTokens>("refresh", { refreshToken });
