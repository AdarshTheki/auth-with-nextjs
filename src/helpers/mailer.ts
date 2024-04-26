import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hash = await bcrypt.hash(userId?.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hash,
                verifyTokenExpiry: new Date(Date.now() + 3600000),
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hash,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
            });
        }

        var transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '8b6bcc33c90ec3', // 🔥🔥
                pass: 'e59517c5f3f02e',
            },
        });

        const mailResponse = await transport.sendMail({
            from: 'sandbox.smtp.mailtrap.io',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            text: `Your verification code is ${userId}`,
            html: `
            <p>
                Your verification code is ${userId}, to
                <a href=${process.env.DOMAIN}/verifyemail?token=${hash}>CLICK HERE</a>
                to ${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'} or copy and
                past the link below in your browser <br />
                <strong>
                    ${process.env.DOMAIN}/verifyemail?token=${hash}
                </strong>
            </p>`,
        });

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
