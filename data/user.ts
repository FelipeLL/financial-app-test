import prisma from '@/prisma/prisma.client';

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};
