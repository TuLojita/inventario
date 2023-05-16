export type IRole = "user" | "admin";

export interface IUser {
  identity: string;
  name: string;
  password: string;
  role: IRole;
}