import MainContent from '@/components/home/main-content';
import Sidebar from '@/components/home/sidebar';

export default function Home() {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <MainContent />
    </div>
  );
}
