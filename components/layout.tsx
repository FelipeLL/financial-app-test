import Sidebar from './sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <main className='bg-gray-50 w-full'>{children}</main>
    </div>
  );
}
