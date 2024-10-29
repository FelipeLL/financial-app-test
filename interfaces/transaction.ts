import { User } from './user';

export interface Transaction {
  id: string;
  amount: string;
  details: string;
  date: number;
  user: User;
}

export interface TransactionsData {
  transactions: Transaction[];
}
