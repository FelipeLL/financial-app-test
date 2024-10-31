import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn('auth0');
    setLoading(false);
  };

  return (
    <div className='h-full flex items-center'>
      <div className='flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center max-w-sm mx-auto'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Aún no has iniciado sesión
        </h2>
        <p className='mt-2 text-gray-600'>
          Inicia sesión aquí para acceder a tu cuenta.
        </p>
        <Button
          disabled={loading}
          className='mt-4'
          size='lg'
          onClick={handleSignIn}
        >
          {loading ? (
            <>
              <Loader />
              <span className='ml-2'>Cargando...</span>
            </>
          ) : (
            'Iniciar sesión'
          )}
        </Button>
        <p className='mt-4 text-sm text-gray-500'>
          ¿Aún no tienes cuenta?{' '}
          <span
            onClick={handleSignIn}
            className='text-blue-500 hover:underline cursor-pointer'
          >
            Créala aquí
          </span>
        </p>
      </div>
    </div>
  );
}
