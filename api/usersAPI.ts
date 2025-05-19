import API_BASE_URL from "./constants/API_BASE_URL";
import { UserInfo, UserProfile } from "../types/api/Users";
import { NewNotification } from "../types/api/Notifications";
import APIError from "../errors/APIError";
import { Duration, VitalStatsResponse } from "../types/api/VitalStats";

// =======================
// GET
// =======================
const fetchUser = async <T>(
  path: string,
  userId: number,
  accessToken: string
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await response.json();
  if (body.status === "error") throw new APIError(body.error);

  return body.data;
};

export const fetchUserInfo = async (userId: number, accessToken: string) =>
  await fetchUser<UserInfo>("info", userId, accessToken);

export const fetchUserProfile = async (userId: number, accessToken: string) =>
  await fetchUser<UserProfile>("profile", userId, accessToken);

export const fetchUserVitalStats = async (
  userId: number,
  duration: Duration,
  accessToken: string
) =>
  await fetchUser<VitalStatsResponse>(
    "vital-stats?duration=" + duration,
    userId,
    accessToken
  );

// =======================
// POST
// =======================
const postUser = async <T>(
  path: string,
  payload: unknown,
  userId: number,
  accessToken: string
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (body.status === "error") throw new APIError(body.error);

  return body.data;
};

export const postNotification = async (
  newNotification: NewNotification,
  userId: number,
  accessToken: string
) =>
  await postUser<{ notificationId: number }>(
    "notifications",
    newNotification,
    userId,
    accessToken
  );

export const postRelationRequest = async (
  userId: number,
  accessToken: string
) =>
  await postUser<{ relationId: number }>(
    "relations",
    undefined,
    userId,
    accessToken
  );
