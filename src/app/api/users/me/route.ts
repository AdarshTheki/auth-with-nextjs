import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/user.model';
import { connect } from '@/dbConfig/dbConnect';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await UserModel.findOne({ _id: userId }).select('-password');
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User is does not exits' },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { success: true, message: 'User found', data: user },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
