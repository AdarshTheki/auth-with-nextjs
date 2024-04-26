'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const { id } = useParams();
    return (
        <div className='flex max-w-sm mx-auto flex-col items-center justify-center min-h-screen py-2 space-y-5'>
            <h2 className='text-3xl'>Profile details page</h2>
            <p>{id}</p>
        </div>
    );
};

export default Page;
