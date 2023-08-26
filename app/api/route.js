import db from '../../utils/db'
import { NextResponse } from 'next/server'

export async function GET(Request) {
    db.connectDb();
    db.disconnectDb();
    return new NextResponse("DB Connected")
}
