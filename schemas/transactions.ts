import { z } from 'zod';
import { TransactionType } from '@prisma/client';

export const createTransactionSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'El monto debe ser un número' })
    .positive('El monto debe ser mayor a 0'),
  details: z
    .string()
    .min(1, { message: 'Este campo es obligatorio' })
    .max(100, 'El concepto debe tener menos de 100 caracteres'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida'),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE], {
    message: 'Selecciona un tipo de movimiento',
  }),
});
