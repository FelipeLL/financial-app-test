import { useRouter } from 'next/router';
import { useCurrentUser } from '@/hooks/use-current-user';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();
  const { isAdmin } = useCurrentUser();

  const cards = [
    {
      href: '/transactions',
      title: 'Sistema de gestión de ingresos y gastos',
      content: 'Accede y administra tus ingresos y gastos de manera eficiente.',
      adminOnly: false,
    },
    {
      href: '/users',
      title: 'Gestión de usuarios',
      content:
        'Administra los usuarios de la plataforma, controlando el acceso a las funcionalidades.',
      adminOnly: true,
    },
    {
      href: '/reports',
      title: 'Reportes',
      content:
        'Visualiza y descarga reportes financieros detallados sobre ingresos y gastos.',
      adminOnly: true,
    },
  ];
  return (
    <div className='flex justify-around items-center p-8 h-full'>
      {cards
        .filter((card) => !card.adminOnly || isAdmin)
        .map((card, index) => (
          <Card
            key={index}
            className='w-1/4 h-52 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl rounded-lg cursor-pointer'
            onClick={() => router.push(card.href)}
          >
            <CardHeader>
              <CardTitle className='text-center text-lg font-semibold text-gray-800'>
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className='text-center text-gray-600'>
              {card.content}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
