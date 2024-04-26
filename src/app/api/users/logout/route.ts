import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConnect';

connect();

export async function GET() {
    try {
        const response = NextResponse.json({ success: true, message: 'Logout successfully' });
        response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
