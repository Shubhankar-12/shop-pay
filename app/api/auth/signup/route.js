import { createRouter } from 'next-connect';
import bcrypt from 'bcrypt';
import db from '../../../../utils/db'
import { NextResponse } from 'next/server';
import { validateEmail } from '@/utils/validation';
import User from '@/models/User';
import { createActivationToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { activateEmail } from '@/emails/activateEmails';
const router = createRouter();

router
    .post(async (req, res) => {
        try {
            await db.connectDb();
            const { name, email, password } = await req.json();

            if (!name || !email || !password) {
                return NextResponse.json({ message: "Please fill in all the details" }, { status: 400 });
            }
            if (!validateEmail(email)) {
                return NextResponse.json({ message: "Invalid Email." }, { status: 400 });
            }

            const user = await User.findOne({ email });

            if (user) {
                return NextResponse.json({ message: "this email already exist.", success: false }, { status: 400 });
            }

            if (password.length < 6) {
                return NextResponse.json({ message: "Password length must be atleast 6 characters.", success: false }, { status: 400 });
            }

            const encryptedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ name, email, password: encryptedPassword });
            const cnfUser = await newUser.save();
            if (cnfUser) {
                const activationToken = createActivationToken({ id: cnfUser._id.toString() });
                const url = `${process.env.BASE_URL}/activation/${activationToken}`;
                sendEmail(email, url, "Activate your Shoppay Account.", activateEmail);
                await db.disconnectDb();
                return NextResponse.json({ message: "Register Success! Please activate your account.", success: true });
            }
            else
                return NextResponse.json({ message: "Error occured", success: false }, { status: 400 });
        } catch (error) {
            return NextResponse.json({ message: error.message });
        }
    });

export async function GET(request, ctx) {
    return router.run(request, ctx);
}
export async function POST(request, ctx) {
    return router.run(request, ctx);
}