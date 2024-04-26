import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/user.model';
import { connect } from '@/dbConfig/dbConnect';

connect();

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        if (!token) {
            return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
        }

        const user = await UserModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 401 }
            );
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json(
            { message: 'email verified successfully', success: true },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
