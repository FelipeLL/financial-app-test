import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema } from '@/schemas/transactions';

type TransactionFormData = z.infer<typeof createTransactionSchema>;

const CreateTransactionPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
  });

  const onSubmit = (data: TransactionFormData) => {
    console.log('Form data:', data);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <Card className='w-1/3 bg-gray-200 p-6 rounded-lg shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-xl font-semibold text-gray-800'>
            Nuevo Movimiento de Dinero
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Label htmlFor='amount' className='text-gray-700 font-semibold'>
                Monto
              </Label>
              <Input
                id='amount'
                type='number'
                placeholder='2500'
                {...register('amount', { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='concept' className='text-gray-700 font-semibold'>
                Concepto
              </Label>
              <Input
                id='concept'
                type='text'
                placeholder='Servicios, viajes, otros'
                {...register('details')}
              />
              {errors.details && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.details.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='date' className='text-gray-700 font-semibold'>
                Fecha
              </Label>
              <Input
                id='date'
                type='date'
                placeholder='Fecha'
                {...register('date')}
              />
              {errors.date && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.date.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='w-full mt-4 bg-gray-500 text-white'
            >
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTransactionPage;
