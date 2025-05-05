import { UserInfo } from "./Users";

export type NotificationType = "emergency" | "warning" | "schedule" | "normal";

export interface ResponseNotification {
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
  ResponseNotification,
  "relatedUserId" | "senderId"
> & { about: UserInfo; sender: UserInfo | "system" };

export type NewNotification = Omit<
  ResponseNotification,
  "id" | "senderId" | "isRead" | "createdAt" | "updatedAt"
>;
