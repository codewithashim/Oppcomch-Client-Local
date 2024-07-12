'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'store';

export default function Home() {
  const router = useRouter();

  const isLogin = useAppSelector((state) => state.auth.authState);
  useEffect(() => {
    if (!isLogin) {
      router.push('/auth/sign-in');
    } else {
      router.push('/admin/default');
    }
  }, [isLogin, router]); 

  return null;
}
