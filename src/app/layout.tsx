import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className} suppressHydrationWarning={true}>
                <div className='min-h-screen'>
                    <div className='bg-white max-w-2xl mx-auto mt-10 flex justify-between items-center text-blue-700 font-medium capitalize p-4'>
                        <Link href='/'>Home</Link>
                        <Link href='/profile'>profile</Link>
                        <Link href='/profile/one'>profile_One</Link>
                        <Link href='/signup'>signup</Link>
                        <Link href='/login'>login</Link>
                        <Link href='/verifyemail'>verifyemail</Link>
                    </div>
                    <div>{children}</div>
                    <Toaster />
                </div>
            </body>
        </html>
    );
}
