import Link from 'next/link';
import { useRouter } from 'next/router';
import { Edit } from 'lucide-react';
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

export default function UsersPage() {
  const router = useRouter();

  const mockUsers = [
    {
      id: 1,
      name: 'Danilo Parra',
      email: 'danilo@example.com',
      phone: '3002768512',
    },
    {
      id: 2,
      name: 'Daniela Gonzales',
      email: 'daniela@example.com',
      phone: '3112768519',
    },
  ];

  return (
    <div className='h-full p-6 '>
      <h1 className='text-2xl font-bold mb-4'>
        Sistema de gestión de Ingresos y Gastos
      </h1>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>Usuarios</h2>
        <Link href='/users'>
          <Button size='lg' variant='outline'>
            Nuevo
          </Button>
        </Link>
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
          {/* TODO: Mapear datos reales */}
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
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
          {/* Fin de datos de ejemplo */}
        </TableBody>
      </Table>
    </div>
  );
}
