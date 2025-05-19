import { UserInfo } from "./Users";

export type NotificationType = "emergency" | "warning" | "schedule" | "normal";

export interface NotificationResponse {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  relatedUserId: number;
  senderId: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Notification = Omit<
  NotificationResponse,
  "relatedUserId" | "senderId"
> & { about: UserInfo; sender: UserInfo | "system" };

export type NewNotification = Omit<
  NotificationResponse,
  "id" | "senderId" | "isRead" | "createdAt" | "updatedAt"
>;
