import { Role } from '@prisma/client';
import { z } from 'zod';

export const editUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Este campo es obligatorio' })
    .max(100, 'El nombre debe tener menos de 100 caracteres'),
  role: z.enum([Role.ADMIN, Role.USER], { message: 'Rol no válido' }),
});
