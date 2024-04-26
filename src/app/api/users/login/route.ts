import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/user.model';
import { connect } from '@/dbConfig/dbConnect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User does not exists' },
                { status: 401 }
            );
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { success: false, message: 'Please enter a valid password' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.TOKEN_SECRET!,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json({ message: 'logged in success', success: true });
        response.cookies.set('token', token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
