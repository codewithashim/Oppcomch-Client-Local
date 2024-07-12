'use client';
import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import { IRoute } from 'types/navigation';
import { MdLock } from 'react-icons/md';
import Swal from 'sweetalert2';
import authImg from '/public/img/auth/auth.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from 'store/authStore';
import { useEffect } from 'react';

function SidebarHorizon(props: { routes: IRoute[]; open: boolean; setOpen: (open: boolean) => void }) {
  const { routes, open, setOpen } = props;
  const { user, logOut, isLogin } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    Swal.fire({
      icon: 'success',
      title: 'Log Out successful',
      showConfirmButton: false,
      timer: 1500,
    });
    router.push('/auth/sign-in');
  };

  // Filter routes based on user role
  const filteredRoutes = routes?.filter(route => {
    if ((route?.path === 'create-user' || route?.path === 'user-list') && user?.role !== 'admin') {
      return false; // Hide 'Create User' and 'User List' if the user is not an admin
    }
    return true;
  });

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className="mx-[56px] flex items-center">
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <Image src={authImg} alt={'cumilla medical college hospital'} width={100} height={100} />
        </div>
      </div>
      <div className="mb-6 mt-[40%] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={filteredRoutes} />
        <div className="ml-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-medium text-gray-600"
          >
            <MdLock className="h-6 w-6" /> Logout
          </button>
        </div>
      </ul>
    </div>
  );
}

export default SidebarHorizon;
