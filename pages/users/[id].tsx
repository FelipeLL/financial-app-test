import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role } from '@prisma/client';

import { editUserSchema } from '@/schemas/users';
import { EDIT_USER } from '@/graphql/apollo-client/mutations';
import { GET_USER_BY_ID } from '@/graphql/apollo-client/queries';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserData } from '@/interfaces/user';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import Loader from '@/components/loader';

type UserFormData = z.infer<typeof editUserSchema>;

const EditUserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const form = useForm<UserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: '',
    },
  });

  const {
    loading,
    error: apolloError,
    data,
  } = useQuery<UserData>(GET_USER_BY_ID, {
    variables: { id },
  });

  const [editUser] = useMutation(EDIT_USER);

  const onSubmit = async (data: UserFormData) => {
    try {
      await editUser({
        variables: {
          id,
          name: data.name,
          role: data.role,
        },
      });

      router.push('/users');
    } catch (error) {
      console.error('[ERROR EDITING USER]: ', error);
    }
  };

  useEffect(() => {
    if (data && data.user) {
      form.reset({
        name: data.user.name,
        role: data.user.role,
      });
    }
  }, [data, form]);

  if (loading) return <Loader />;
  if (apolloError) return <p>Error : {apolloError.message}</p>;

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <Card className='w-1/3 bg-gray-200 p-6 rounded-lg shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-xl font-semibold text-gray-800'>
            Editar usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un rol' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Role.USER}>Usuario</SelectItem>
                        <SelectItem value={Role.ADMIN}>
                          Administrador
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
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

export default EditUserPage;
