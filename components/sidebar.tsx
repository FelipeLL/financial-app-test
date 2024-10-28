import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, DollarSign, Users, BarChart, LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';

const Sidebar: FC = () => {
  const router = useRouter();

  const routes = [
    {
      label: 'Inicio',
      href: '/',
      icon: Home,
    },
    {
      label: 'Ingresos y egresos',
      href: '/transactions',
      icon: DollarSign,
    },
    {
      label: 'Usuarios',
      href: '/users',
      icon: Users,
    },
    {
      label: 'Reportes',
      href: '/reports',
      icon: BarChart,
    },
  ];

  return (
    <aside className='h-full w-96 bg-gray-800 text-white p-4 flex flex-col items-center shadow-lg'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>FINANCE APP</h1>
      </div>

      <nav className='w-full'>
        {routes.map((route, index) => {
          const Icon = route.icon;
          return (
            <Link
              key={index}
              href={route.href}
              className={cn(
                'block w-full p-3 mb-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 hover:shadow-md',
                {
                  'bg-gray-500': router.pathname === route.href,
                }
              )}
            >
              <div className='flex gap-4'>
                <Icon />
                <p>{route.label}</p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className='block w-full mt-auto  p-3 mb-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 hover:shadow-md cursor-pointer'>
        <div className='flex justify-center gap-2'>
          <LogOut />
          <p>Cerrar sesión</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
