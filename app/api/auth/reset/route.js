import { createRouter } from 'next-connect';
import db from '../../../../utils/db'
import { NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { resetConfirmation } from '@/emails/resetConfirmation';
import { sendEmail } from '@/utils/sendEmail';

const router = createRouter();

router
    .put(async (req, res) => {
        try {
            await db.connectDb();
            const { id, password } = await req.json();

            const user = await User.findById(id);
            if (!user) {
                return NextResponse.json({ message: "User doesn't exist." }, { status: 400 });
            }
            const encryptPassword = await bcrypt.hash(password, 12);
            await user.updateOne({
                password: encryptPassword
            })

            sendEmail(user.email, "", "Password updated successfully!", resetConfirmation);
            await db.disconnectDb();

            return NextResponse.json({ email: user.email, success: true });

        } catch (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    });


export async function PUT(request, ctx) {
    return router.run(request, ctx);
}