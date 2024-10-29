import { Role } from '@prisma/client';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
}

export interface UsersData {
  users: User[];
}

export interface UserData {
  user: User;
}
