'use client'

import Link from 'next/link';
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { ErrorData, Login, LoginResponse } from "@src/features/auth/interfaces/login.interface";
import LoginForm from '@src/features/auth/components/LoginForm';
import { login } from '@src/features/auth/store/authSlice';

import { useEffect, useState } from 'react';
import AlertErrorComponent from '@src/features/auth/components/AlertErrorComponent';
import { useAppDispatch, useAppSelector } from '@src/store';
import { fetchUserData } from '@src/features/auth/store/authThunks';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Login>();

  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState<ErrorData>({title: '', description: ''});

  const { isAuthenticated } = useAppSelector( state =>state.auth )

  useEffect(() => {
    if (isAuthenticated) {
      // router.push('/')
    }
  
  }, [isAuthenticated])
  

  const onSubmit = async (value : Login) => {
    setLoading(true)
    const url = process.env.ApiBackEnd || "";
    const data = {
      "email": watch('email'),
      "password":  watch('password'),
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(`${url}/login`, requestOptions);
      const responseData: LoginResponse = await response.json();
      if(!responseData.error){
        setLoginError(false);
        localStorage.setItem('token', responseData.token || '');
        dispatch(login(responseData.user));
        router.push('/')   
      } else {
        setLoginError(true);
        setErrorData({title: 'No se pudo iniciar sesión', description: 'Verifique correo o contraseña ingresados'})
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorData({title: 'No se pudo iniciar sesión', description: 'Verifique correo o contraseña ingresados'})
      setLoginError(true);
      setLoading(false);
    }

    
  }
  
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl dark:text-white">Login</h1>
        </div>
        <LoginForm 
          register={register} 
          handleSubmit={handleSubmit} 
          watch={watch} 
          errors={errors}
          onSubmit={onSubmit}
          loading={loading}
        />
        { loginError && <AlertErrorComponent title={errorData.title} description={errorData.description} />}
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};
export default LoginPage;
