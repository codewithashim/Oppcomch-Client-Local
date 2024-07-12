'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/authStore';

export default function Home() {
  const router = useRouter();
  const { user, isLogin} = useAuthStore();

   console.log(user , "user -==================---0o0=----------")

  useEffect(() => {
    if (!isLogin) {
      router.push('/auth/sign-in');
    } else {
      router.push('/admin/default');
    }
  }, [user, router, isLogin]); 

  return null;
}
