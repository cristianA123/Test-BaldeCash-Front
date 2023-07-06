"use client"
import { Home } from '@src/features/home/components';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@src/store';
import { useRouter } from "next/navigation";
import { User} from '@src/features/home/interfaces/user.interface';


export const metadata: Metadata = {
  title: 'Test',
  description: '',
  authors: [
    {
      name: 'Cristian Chipana',
    },
  ]
};




export default function HomePage() {
  const { isAuthenticated } = useAppSelector( state =>state.auth )
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
 
  const getUsers = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const res = await fetch(`${process.env.ApiBackEnd}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  
  }, [isAuthenticated])

  return (
    <section className="">
      <Home users={users} setUsers={setUsers}/>
    </section>
  )
}
