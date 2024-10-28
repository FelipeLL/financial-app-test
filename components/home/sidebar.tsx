import Link from 'next/link';
import { FC } from 'react';

const Sidebar: FC = () => {
  const routes = [
    {
      label: 'Ingresos y egresos',
      href: '/transactions',
    },
    {
      label: 'Usuarios',
      href: '/users',
    },
    {
      label: 'Reportes',
      href: '/reports',
    },
  ];

  return (
    <aside className='h-full w-64 bg-gray-800 text-white p-4 flex flex-col items-center shadow-lg'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>FINANCE APP</h1>
      </div>

      <nav className='w-full'>
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            className='block w-full text-center p-3 mb-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 hover:shadow-md'
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
