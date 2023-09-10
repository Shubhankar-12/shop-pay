import { createRouter } from 'next-connect';
import db from '../../../../utils/db'
import { NextResponse } from 'next/server';
import { validateEmail } from '@/utils/validation';
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

            // console.log(body);
            return NextResponse.json({ message: "POST Worked", success: true });
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