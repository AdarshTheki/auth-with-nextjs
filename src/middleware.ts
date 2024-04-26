import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/profile', '/profile/:id', '/verifyemail'];
const publicRoutes = ['/', '/login', '/signup'];

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);

    const token = cookies().get('token')?.value;

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if (!isPublicRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/users', '/login', '/signup', '/profile', '/profile/:id', '/verifyemail'],
};
