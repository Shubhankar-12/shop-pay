import { createRouter } from 'next-connect';
import db from '../../../../utils/db'
import { NextResponse } from 'next/server';
import User from '@/models/User';
import { createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { ResetEmail } from '@/emails/resetEmail';
const router = createRouter();

router
    .post(async (req, res) => {
        try {
            await db.connectDb();
            const { email } = await req.json();

            const user = await User.findOne({ email });
            if (!user) {
                return NextResponse.json({ message: "Invalid Email or User doesn't exist." }, { status: 400 });
            }
            const user_id = createResetToken({
                id: user._id.toString(),
            });

            const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;

            sendEmail(email, url, "Reset your Shoppay password.", ResetEmail);
            await db.disconnectDb();

            return NextResponse.json({ message: "Reset password link has been sent to your registered email.", success: true });

        } catch (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    });


export async function POST(request, ctx) {
    return router.run(request, ctx);
}