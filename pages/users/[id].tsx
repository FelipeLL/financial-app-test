import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editUserSchema } from '@/schemas/users';

type UserFormData = z.infer<typeof editUserSchema>;

const EditUserPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(editUserSchema),
  });

  const onSubmit = (data: UserFormData) => {
    console.log('Form data:', data);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <Card className='w-1/3 bg-gray-200 p-6 rounded-lg shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-xl font-semibold text-gray-800'>
            Editar usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Label htmlFor='name' className='text-gray-700 font-semibold'>
                Nombre
              </Label>
              <Input
                id='name'
                type='number'
                placeholder='2500'
                {...register('name', { valueAsNumber: true })}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='role' className='text-gray-700 font-semibold'>
                Rol
              </Label>
              <Input
                id='role'
                type='text'
                placeholder='Servicios, viajes, otros'
                {...register('role')}
              />
              {errors.role && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='w-full mt-4 bg-gray-500 text-white'
            >
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserPage;
