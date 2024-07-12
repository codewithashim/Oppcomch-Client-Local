'use client';
import PreloaderComponent from 'components/preloader/preloadr';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store';

export default function Home() {
  const router = useRouter();
  const isLogin = useAppSelector((state) => state.auth.authState);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (!isLogin) {
      router.push('/auth/sign-in');
    } else {
      router.push('/admin/default');
    }
    setIsLoading(false);
  }, [router, isLogin]);

  if (isLoading) {
    return <PreloaderComponent/>;
  }

  return  <PreloaderComponent/>;
}
