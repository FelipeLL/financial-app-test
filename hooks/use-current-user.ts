import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();

  const isLoggedIn = !!session.data?.user;

  const isAdmin = session.data?.user?.role === Role.ADMIN;

  const user = session.data?.user;

  return { user, isLoggedIn, isAdmin };
};
