import Link from 'next/link';
import { useQuery } from '@apollo/client';

import { GET_TRANSACTIONS } from '@/graphql/apollo-client/queries';
import {
  TransactionsData,
  TransactionTypeLabel,
} from '@/interfaces/transaction';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format-date';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loader from '@/components/loader';
import { Badge } from '@/components/ui/badge';
import { TransactionType } from '@prisma/client';
import { getTotalAmountByType } from '@/lib/transaction';

export default function TransactionsPage() {
  const {
    loading,
    error: apolloError,
    data,
  } = useQuery<TransactionsData>(GET_TRANSACTIONS);

  if (loading) return <Loader />;
  if (apolloError) return <p>Error : {apolloError.message}</p>;

  return (
    <div className='h-full p-6 '>
      <h1 className='text-2xl font-bold mb-4'>
        Sistema de gestión de Ingresos y Gastos
      </h1>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>Ingresos y egresos</h2>
        <Link href='/transactions/create'>
          <Button size='lg' variant='outline'>
            Nuevo
          </Button>
        </Link>
      </div>

      <Table className='min-w-full table-auto bg-gray-200'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-1/5'>Tipo</TableHead>
            <TableHead className='w-1/5'>Concepto</TableHead>
            <TableHead className='w-1/5'>Monto</TableHead>
            <TableHead className='w-1/5'>Fecha</TableHead>
            <TableHead className='w-1/5'>Usuario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Badge
                  className='w-16'
                  variant={
                    transaction.type === TransactionType.INCOME
                      ? 'success'
                      : 'destructive'
                  }
                >
                  {TransactionTypeLabel[transaction.type]}
                </Badge>
              </TableCell>
              <TableCell>{transaction.details}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>{transaction.user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='flex justify-end mt-4'>
        <div className='px-4 py-2 w-60 bg-gray-200 rounded text-right font-semibold'>
          Total ingresos:{' '}
          {data && getTotalAmountByType(data, TransactionType.INCOME)}
        </div>
      </div>
      <div className='flex justify-end mt-4'>
        <div className='px-4 py-2 w-60 bg-gray-200 rounded text-right font-semibold'>
          Total egresos:{' '}
          {data && getTotalAmountByType(data, TransactionType.EXPENSE)}
        </div>
      </div>
    </div>
  );
}
