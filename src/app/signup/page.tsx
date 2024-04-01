'use client';

import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [user,setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading,setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      router.push('/login');

    } catch(error:any) {
      console.log("Signup failed !!!");
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  },[user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-3xl font-semibold py-4'>{loading ? "Proccessing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username" className='py-1'>Username</label>
      <input 
      className='p-2 border w-1/4 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='username'
      value={user.username}
      onChange={(e) => { setUser({...user,username: e.target.value})}}
      placeholder='username'
      type="text" />


      <label htmlFor="email" className='py-1'>Email</label>
      <input 
      className='p-2 border w-1/4 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='email'
      value={user.email}
      onChange={(e) => { setUser({...user,email: e.target.value})}}
      placeholder='email'
      type="text" />

      <label htmlFor="password" className='py-1'>Password</label>
      <input 
      className='p-2 border w-1/4 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='password'
      value={user.password}
      onChange={(e) => { setUser({...user,password: e.target.value})}}
      placeholder='password'
      type="text" />
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignup}>
        {buttonDisabled ?  "No signup" : "Signup"}
      </button>
      <Link href="/login" className='py-4'>Visit Login Page</Link>
    </div>
  )
}