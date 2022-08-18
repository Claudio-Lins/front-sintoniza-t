import { UserProps } from "./User";

export type AuthUser = UserProps & {
  role: string;
  active: boolean;
  createdAt: Date;
}