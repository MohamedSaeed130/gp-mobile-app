import API_BASE_URL from "./constants/API_BASE_URL";
import { Relation } from "../types/api/Relations";
import { UserInfo, UserProfile, UserProfileChange } from "../types/api/Users";
import { Notification, ResponseNotification } from "../types/api/Notifications";
import { fetchUserInfo } from "./usersAPI";
import APIError from "../errors/APIError";

// =======================
// GET
// =======================
const fetchMy = async <T>(path: string, accessToken: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/me/${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await response.json();
  if (body.status === "error") throw new APIError(body.error);

  return body.data;
};

export const fetchMyInfo = async (accessToken: string) =>
  await fetchMy<UserInfo>("info", accessToken);

export const fetchMyRelations = async (accessToken: string) =>
  await fetchMy<Relation[]>("relations", accessToken);

export const fetchMyProfile = async (accessToken: string) =>
  await fetchMy<UserProfile>("profile", accessToken);

export const fetchMyNotifications = async (
  query: { page: number; size: number },
  accessToken: string
): Promise<{ total: number; notifications: Notification[] }> => {
  const response = await fetch(
    `${API_BASE_URL}/me/notifications?page=${query.page}&size=${query.size}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const body = await response.json();
  if (body.status === "error") throw new APIError(body.error);

  const notifications = await Promise.all(
    body.data.notifications.map(
      async (resNotification: ResponseNotification) => {
        const notification: any = { ...resNotification };
        const sender =
          resNotification.senderId == 0
            ? "system"
            : await fetchUserInfo(resNotification.senderId, accessToken);
        const about = await fetchUserInfo(
          resNotification.relatedUserId,
          accessToken
        );

        delete notification["senderId"];
        delete notification["relatedUserId"];
        notification.sender = sender;
        notification.about = about;

        return notification;
      }
    )
  );

  return { total: body.data.total, notifications };
};

// =======================
// PATCH
// =======================
export const changeProfile = async (
  profileChange: UserProfileChange,
  accessToken: string
) => {
  const response = await fetch(`${API_BASE_URL}/me/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileChange),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new APIError(
      body?.status === "error"
        ? body.error
        : { message: "Failed to change profile" }
    );
  }
};
