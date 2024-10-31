import { Bar } from 'react-chartjs-2';

import { cn } from '@/lib/utils';
import 'tailwindcss/tailwind.css';

import { Transaction } from '@/interfaces/transaction';

interface IncomeExpenseChartProps {
  transactions: Transaction[];
}

const TransactionsBarChart: React.FC<IncomeExpenseChartProps> = ({
  transactions,
}) => {
  const groupedData = transactions.reduce((acc, transaction) => {
    const date = new Date(Number(transaction.date)).toLocaleDateString(
      'es-ES',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );
    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }
    if (transaction.type === 'INCOME') {
      acc[date].income += transaction.amount;
    } else if (transaction.type === 'EXPENSE') {
      acc[date].expense += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const labels = Object.keys(groupedData);
  const incomes = labels.map((date) => groupedData[date].income);
  const expenses = labels.map((date) => groupedData[date].expense);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: incomes,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: 'Egresos',
        data: expenses,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className={cn('w-full bg-white shadow-lg p-6 rounded-lg')}>
      <h2 className='text-xl font-semibold text-center text-gray-800 mb-4'>
        Movimientos de Ingresos y Egresos
      </h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14,
                },
                color: '#333',
              },
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  let label = context.dataset.label || '';
                  if (label) label += ': ';
                  label += `$${context.raw}`;
                  return label;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TransactionsBarChart;
