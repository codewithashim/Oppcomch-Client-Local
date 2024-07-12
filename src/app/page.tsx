'use client';
import PreloaderComponent from 'components/preloader/preloadr';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/authStore';

export default function Home() {
  const router = useRouter();
  const { user, isLogin } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (!isLogin) {
      router.push('/auth/sign-in');
    } else {
      router.push('/admin/default');
    }
    setIsLoading(false);
  }, [user, router, isLogin]);

  if (isLoading) {
    return <PreloaderComponent/>;
  }

  return  <PreloaderComponent/>;
}
