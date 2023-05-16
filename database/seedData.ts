import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";

interface SeedUser {
  users: IUser[],
}

export const initialUsers: SeedUser = {
  users: [
    {
      identity: '12345678',
      name: 'Admin',
      password: bcrypt.hashSync('123456789'),
      role: "admin"
    },
  ]
}