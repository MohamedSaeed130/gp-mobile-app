import APIError from "../errors/APIError";
import API_BASE_URL from "./constants/API_BASE_URL";

export const readNotification = async (
  notificationId: number,
  accessToken: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/notifications/${notificationId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ isRead: true }),
    }
  );
  if (!response.ok) {
    const body = await response.json();
    throw new APIError(
      body?.status === "error"
        ? body.error
        : { message: "Failed to read notification" }
    );
  }
};

export const deleteNotification = async (
  notificationId: number,
  accessToken: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/notifications/${notificationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    const body = await response.json();
    throw new APIError(
      body?.status === "error"
        ? body.error
        : { message: "Failed to delete notification" }
    );
  }
};
