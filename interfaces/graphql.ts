import { Role, TransactionType } from '@prisma/client';

export interface AddUser {
  name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface EditUser {
  id: string;
  role: Role;
}

export interface AddTransaction {
  amount: number;
  date: string;
  details: string;
  type: TransactionType;
  userId: string;
}
