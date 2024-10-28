import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const MainContent: FC = () => {
  const cards = [
    {
      title: 'Sistema de gestión de ingresos y gastos',
      content: 'Accede y administra tus ingresos y gastos de manera eficiente.',
    },
    {
      title: 'Gestión de usuarios',
      content:
        'Administra los usuarios de la plataforma, controlando el acceso a las funcionalidades.',
    },
    {
      title: 'Reportes',
      content:
        'Visualiza y descarga reportes financieros detallados sobre ingresos y gastos.',
    },
  ];
  return (
    <main className='flex-1 flex justify-around items-center p-8 bg-gray-50'>
      {cards.map((card, index) => (
        <Card
          key={index}
          className='w-1/4 h-52 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl rounded-lg cursor-pointer'
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
    </main>
  );
};

export default MainContent;
