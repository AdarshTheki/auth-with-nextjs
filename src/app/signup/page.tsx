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
        username: '',
    });
    const [loading, setLoading] = useState(false);
    const [isButtonOn, setIsButtonOn] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('signup success', response.data);
            router.push('/login');
        } catch (error: any) {
            console.log('signup failed', error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setIsButtonOn(true);
        } else {
            setIsButtonOn(false);
        }
    }, [user.email.length, user.password.length, user.username.length]);

    return (
        <div className='flex max-w-sm mx-auto flex-col items-center justify-center min-h-screen py-2 space-y-5'>
            <h2 className='text-3xl'>{loading ? 'Processing...' : 'Sign Up Page'}</h2>
            <hr />
            <div className='w-full capitalize flex justify-between'>
                <label htmlFor='username'>username</label>
                <input
                    className='p-2 rounded'
                    type='text'
                    id='username'
                    placeholder='please enter username'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
            </div>
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
            <button
                disabled={!isButtonOn}
                onClick={onSignup}
                className='p-2.5 text-gray-900 bg-white disabled:opacity-50 font-semibold rounded-md'>
                {!isButtonOn ? 'No Signup' : 'Signup'}
            </button>
            <p className='text-2xl font-semibold text-blue-600 underline capitalize'>
                <Link href={'/login'}>LogIn page to click here!</Link>
            </p>
        </div>
    );
}
