'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [isButtonOn, setIsButtonOn] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            toast.success(response.data.message);
            router.push('/profile');
        } catch (error: any) {
            console.log('login failed', error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setIsButtonOn(true);
        } else {
            setIsButtonOn(false);
        }
    }, [user.email.length, user.password.length]);

    return (
        <div className='flex max-w-sm mx-auto flex-col items-center justify-center min-h-screen py-2 space-y-5'>
            <h2 className='text-3xl'>LogIn Page</h2>
            <hr />
            <div className='w-full capitalize flex justify-between'>
                <label htmlFor='email'>email</label>
                <input
                    type='email'
                    className='p-2 rounded'
                    id='email'
                    placeholder='please enter email'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>
            <div className='w-full capitalize flex justify-between'>
                <label htmlFor='password'>password</label>
                <input
                    type='text'
                    className='p-2 rounded'
                    id='password'
                    placeholder='please enter password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>
            {loading ? (
                <button className='p-2.5 text-gray-900 bg-white disabled:opacity-50 font-semibold rounded-md'>
                    Processing...
                </button>
            ) : (
                <button
                    disabled={!isButtonOn}
                    onClick={onLogin}
                    className='p-2.5 text-gray-900 bg-white disabled:opacity-50 font-semibold rounded-md'>
                    {!isButtonOn ? 'No LogIn' : 'LogIn'}
                </button>
            )}
            <p className='text-2xl font-semibold text-blue-600 underline capitalize'>
                <Link href={'/signup'}>signup page to register!</Link>
            </p>
        </div>
    );
}
