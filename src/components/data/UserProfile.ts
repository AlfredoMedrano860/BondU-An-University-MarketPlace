import type { User } from "./User";

export interface UserProfile extends User {
  phone?: string;
  university?: string;
  career?: string;
  notifications?: boolean;
  language?: "es" | "en";
}