import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import UserModel from '@/models/user.model';
import { connect } from '@/dbConfig/dbConnect';
import { sendEmail } from '@/helpers/mailer';

// http://localhost:3000/api/users/signup

connect();

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        console.log('userData:', username, email, password);

        // validation check
        if (!username || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Invalid signup input fields ${username}, ${email}, ${password}`,
                },
                { status: 401 }
            );
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 404 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ username, email, password: hashedPassword });
        const saveUser = await newUser.save();

        // send email verification
        await sendEmail({ email, emailType: 'VERIFY', userId: saveUser._id });

        return NextResponse.json(
            { message: 'User registered successfully', success: true, saveUser },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
