'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { useState } from 'react';
import axios from 'axios';
import { LoginUrl } from 'utils/urls/auth';
import Swal from 'sweetalert2';
import BtnSpinner from 'components/utils/Spinner/BtnSpinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignInDefault() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.post(LoginUrl, { email, password });
      const token = response.data.data.accessToken;

      if (token) {
        localStorage.setItem('accessToken', token);
 
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1500,
        });

        await router.push('/admin/default');
        setIsRedirecting(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to get authentication token',
          text: 'Please try again later',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'Please try again later',
      });
    }
    setIsLoading(false);
  };

  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="admin@gmail.com"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className={`linear mx-auto w-full rounded-xl py-3 text-center text-base font-medium text-white transition duration-200 ${
                isLoading || isRedirecting
                  ? 'cursor-not-allowed bg-brand-100'
                  : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
              }`}
              disabled={isLoading || isRedirecting}
            >
              {isLoading || isRedirecting ? (
                <span className="flex items-center justify-center gap-1">
                  <BtnSpinner /> {isLoading ? 'Verifying' : 'Redirecting'}
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;
