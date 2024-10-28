import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function TransactionsPage() {
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
            <TableHead className='w-1/4'>Concepto</TableHead>
            <TableHead className='w-1/4'>Monto</TableHead>
            <TableHead className='w-1/4'>Fecha</TableHead>
            <TableHead className='w-1/4'>Usuario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* TODO: Mapear datos reales */}
          <TableRow>
            <TableCell>Concepto de Ejemplo</TableCell>
            <TableCell>$1000</TableCell>
            <TableCell>2024-10-28</TableCell>
            <TableCell>Usuario1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Otro Concepto</TableCell>
            <TableCell>$1500</TableCell>
            <TableCell>2024-10-28</TableCell>
            <TableCell>Usuario2</TableCell>
          </TableRow>
          {/* Fin de datos de ejemplo */}
        </TableBody>
      </Table>

      <div className='flex justify-end mt-4'>
        <div className='px-4 py-2 bg-gray-200 rounded text-right font-semibold'>
          Total: $$$$$$$$$$
        </div>
      </div>
    </div>
  );
}
