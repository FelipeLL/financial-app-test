import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';

import { createTransactionSchema } from '@/schemas/transactions';
import { ADD_TRANSACTION } from '@/graphql/apollo-client/mutations';
import { TransactionType } from '@prisma/client';
import { useCurrentUser } from '@/hooks/use-current-user';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type TransactionFormData = z.infer<typeof createTransactionSchema>;

const CreateTransactionPage: React.FC = () => {
  const router = useRouter();
  const { user } = useCurrentUser();

  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: 0,
      details: '',
      date: '',
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    try {
      if (!user?.id) {
        throw new Error('No se ha encontrado un usuario');
      }

      await addTransaction({
        variables: {
          amount: data.amount,
          details: data.details,
          date: data.date,
          type: data.type,
          userId: user.id,
        },
      });
      router.push('/transactions');
    } catch (error) {
      console.error('[ERROR ADDING TRANSACTION]: ', error);
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='2500'
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='details'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concepto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Servicios, viajes, otros'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input type='date' placeholder='Fecha' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Movimiento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un tipo de transacción' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TransactionType.INCOME}>
                          Ingreso
                        </SelectItem>
                        <SelectItem value={TransactionType.EXPENSE}>
                          Gasto
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                type='submit'
                className='w-full mt-4 bg-gray-500 text-white'
              >
                Guardar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTransactionPage;
