'use client';
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { SIGNUP_URL } from "utils/urls/auth";
 
interface FormData {
  email: string;
  name: string;
  phone: string;
  role: string;
  password: string;
}

const CreateUser: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await axios.post(SIGNUP_URL, {
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: data.password,
        role: "subadmin"
      });

      if (response?.status === 200) {
        Swal.fire({
            icon: 'success',
            title: 'Signup successfully done',
            showConfirmButton: false,
            timer: 1500,
          });
        reset();
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Failed to get authentication token',
            text: 'Please try again later',
          });
      }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Failed to get authentication token',
            text: 'Please try again later',
          });
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="container py-4">
        <div className="bg-[#ffffff92] mx-auto rounded-xl p-6 sm:p-8 md:p-10 w-full xl:max-w-[70%]">
          <div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between">
              <div>
                <h1 className="text-[1.2rem] md:text-[1.5rem]">
                  Welcome to{" "}
                  <span className="text-[#B29F6B] font-extrabold">
                  Patient Portal
                  </span>
                </h1>
                <h1 className="text-[2rem] md:text-[2.3rem] font-bold">
                  Sign Up For User
                </h1>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 gap-4">
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Full Name"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.name && (
                  <p className="text-red-500">Name is required.</p>
                )}
              </div>
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Enter email address
                </label>
                <input
                  {...register("email", { required: true })}
                  placeholder="User Email"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required.</p>
                )}
              </div>
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Contact Number
                </label>
                <input
                  {...register("phone", { required: true })}
                  placeholder="Contact Number"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.phone && (
                  <p className="text-red-500">Contact Number is required.</p>
                )}
              </div>

              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Enter your Password
                </label>
                <input
                  {...register("password", { required: true })}
                  placeholder="Enter your Password"
                  type="password"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.password && (
                  <p className="text-red-500">Password is required.</p>
                )}
              </div>
               
              <div className="flex justify-end my-4">
                <button
                  className={`
                    bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200
                     px-8 md:px-10 py-2 md:py-3 rounded text-[1.3rem] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Submitting...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default CreateUser;
