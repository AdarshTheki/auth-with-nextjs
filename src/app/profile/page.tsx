'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    const [user, setUser]: any = useState(null);
    const [loading, setLoading] = useState(false);

    async function getUserDetails() {
        try {
            setLoading(true);
            const res = await axios.post('/api/users/me');
            setUser(res.data.data);
            toast.success(res.data?.message);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/logout');
            toast.success(res.data?.message);
        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex max-w-sm mx-auto flex-col items-center justify-center min-h-screen py-2 space-y-5'>
            <h2 className='text-3xl font-semibold'>Profile Page</h2>
            <hr />
            <div className=' text-left'>
                <p>_id: {user?._id || '#NA'}</p>
                <p>username: {user?.username || '#NA'}</p>
                <p>email: {user?.email || '#NA'}</p>
            </div>

            {user?._id ? (
                <>
                    <Link
                        className='text-blue-600 underline text-xl capitalize'
                        href={`/profile/${user?._id}`}>
                        profile ids
                    </Link>
                    {!user?.isVerified && (
                        <Link
                            className='text-blue-600 underline text-xl capitalize'
                            href={`/verifyemail?token=${user?.verifyToken}`}>
                            verify email token
                        </Link>
                    )}
                </>
            ) : (
                <button className='bg-green-600' onClick={getUserDetails}>
                    {loading ? 'Loading...' : 'Get User me'}
                </button>
            )}

            {user?._id ? (
                <button className='bg-red-600' onClick={logout}>
                    {loading ? 'Loading...' : 'Logout User'}
                </button>
            ) : (
                <button className='bg-red-600'>User token null go to login</button>
            )}
        </div>
    );
};

export default Page;
