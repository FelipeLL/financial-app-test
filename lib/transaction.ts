import { TransactionsData } from '@/interfaces/transaction';
import { TransactionType } from '@prisma/client';

export function getTotalAmountByType(
  data: TransactionsData,
  type: TransactionType
) {
  return data?.transactions.reduce(
    (acc, transaction) =>
      transaction.type === type ? acc + transaction.amount : acc,
    0
  );
}
