'use client';
import React, { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [data,setData] = useState('nothing');

    const getUserDetails = async () => {
        try {
            const response = await axios.post('/api/users/me');
            console.log(response.data);
            setData(response.data.data._id);
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            console.log(response.data);
            toast.success("logout success");
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-3xl font-semibold py-4'>Profile Page</h1>
      <hr />
      <h2>
        {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 m-4' onClick={getUserDetails}>Get Details</button>
      <hr />
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ' onClick={logout}>Logout</button>
    </div>
  )
}