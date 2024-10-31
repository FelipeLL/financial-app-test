import Link from 'next/link';
import { useRouter } from 'next/router';
import { Edit } from 'lucide-react';
import { useQuery } from '@apollo/client';

import { GET_USERS } from '@/graphql/apollo-client/queries';
import { UsersData } from '@/interfaces/user';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import Loader from '@/components/loader';

export default function UsersPage() {
  const router = useRouter();

  const { loading, error: apolloError, data } = useQuery<UsersData>(GET_USERS);

  if (loading) return <Loader />;
  if (apolloError) return <p>Error : {apolloError.message}</p>;

  return (
    <div className='h-full p-6 '>
      <h1 className='text-2xl font-bold mb-4'>
        Sistema de gestión de Ingresos y Gastos
      </h1>

      <div className='mb-4'>
        <h2 className='text-lg font-semibold'>Usuarios</h2>
      </div>

      <Table className='min-w-full table-auto bg-gray-200'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-1/4'>Nombre</TableHead>
            <TableHead className='w-1/4'>Correo</TableHead>
            <TableHead className='w-1/4'>Teléfono</TableHead>
            <TableHead className='w-1/4'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      data-testid={`edit-${user.id}`}
                      onClick={() => router.push(`/users/${user.id}`)}
                    >
                      <Edit />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
