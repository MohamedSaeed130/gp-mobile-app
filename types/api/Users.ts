export type UserRole = "caregiver" | "ward";

export interface UserInfo {
  id: number;
  role: UserRole;
  fullName: string;
  img: string;
  title?: string;
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  img: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  title?: string;
  organization?: string;
  impairment?: string;
}

export interface UserProfileChange {
  firstName?: string;
  lastName?: string;
  title?: string;
  phoneNumber?: string;
  organization?: string;
  impairment?: string;
}
