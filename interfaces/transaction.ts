import { TransactionType } from '@prisma/client';
import { User } from './user';

export interface Transaction {
  id: string;
  amount: string;
  details: string;
  type: TransactionType;
  date: number;
  user: User;
}

export enum TransactionTypeLabel {
  INCOME = 'Ingreso',
  EXPENSE = 'Egreso',
}

export interface TransactionsData {
  transactions: Transaction[];
}
