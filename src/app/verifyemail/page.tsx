'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    const [verify, setVerify] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setError(false);
            const res = await axios.post('/api/users/verifyemail', { token });
            setVerify(true);
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    // useEffect(() => {
    //     const urlToken = window.location.search.split('=')[1];
    //     setToken(urlToken || '');
    // }, []);

    useEffect(() => {
        if (token.length > 5) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className='flex max-w-sm mx-auto flex-col items-center justify-center min-h-screen py-2 space-y-5'>
            <h2 className='text-3xl'>Verify Email</h2>
            <hr />
            <p>Token: {token ? token : 'no-token found'}</p>
            {verify && (
                <div>
                    <h2>
                        Verified
                        <Link href={'/login'}>Login</Link>
                    </h2>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error: {error}</h2>
                </div>
            )}
        </div>
    );
}
