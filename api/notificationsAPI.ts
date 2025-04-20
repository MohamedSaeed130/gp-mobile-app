import API_BASE_URL from "./constants/API_BASE_URL";

export const readNotification = async (
  notificationId: number,
  accessToken: string
) =>
  await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ isRead: true }),
  });

export const deleteNotification = async (
  notificationId: number,
  accessToken: string
) =>
  await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
