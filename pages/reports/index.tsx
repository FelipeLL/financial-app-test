import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

import { cn } from '@/lib/utils';
import { getTotalAmountByType } from '@/lib/transaction';
import { TransactionsData } from '@/interfaces/transaction';
import { GET_TRANSACTIONS } from '@/graphql/apollo-client/queries';

import TransactionsBarChart from '@/components/reports/charts/bar';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function ReportsPage() {
  const {
    loading,
    error: apolloError,
    data,
  } = useQuery<TransactionsData>(GET_TRANSACTIONS);

  const downloadCSV = () => {
    // TODO: Implementar la lógica para descargar el CSV
  };

  const { balance } = useMemo(() => {
    if (!data?.transactions) {
      return { totalIncome: 0, totalExpense: 0, balance: 0 };
    }

    const totalIncome = getTotalAmountByType(data, 'INCOME');
    const totalExpense = getTotalAmountByType(data, 'EXPENSE');

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [data]);

  if (loading) return <Loader />;
  if (apolloError) return <p>Error : {apolloError.message}</p>;

  return (
    <div className='h-full p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        Sistema de gestión de Ingresos y Gastos
      </h1>
      <div className='flex space-x-8'>
        <div className='w-2/3 bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-700 mb-4'>
            Movimientos
          </h2>

          <TransactionsBarChart transactions={data?.transactions || []} />
        </div>
        <div className='w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-semibold  mb-4'>Saldo</h2>
          <p
            className={cn(
              'text-5xl font-bold mb-6',
              balance >= 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            ${balance.toLocaleString()}
          </p>
          <Button size='lg' onClick={downloadCSV}>
            Descargar CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
