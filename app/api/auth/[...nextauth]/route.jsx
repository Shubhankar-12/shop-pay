import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import clientPromise from "../lib/mongodb";
import User from "@/models/User";
import db from "@/utils/db";
import mongoose from "mongoose";

export const authOptions = {
    // Oauth authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await db.connectDb();
                const email = credentials.email;
                const password = credentials.password;
                const user = await User.findOne({ email });
                if (user) {
                    await db.disconnectDb();
                    return SignInUser({ password, user });
                } else {
                    throw new Error("This email does not exist.");
                }
            }
        })
        ,
        GithubProvider({
            clientId: process.env.NEXT_APP_GITHUB_ID,
            clientSecret: process.env.NEXT_APP_GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            await db.connectDb();
            var id = new mongoose.Types.ObjectId(token.sub);
            let user = await User.findOne(id);
            session.user._id = token.sub || user._id.toString();
            session.user.role = user.role || "user";
            await db.disconnectDb();

            return session;
        }
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET

}

const SignInUser = async ({ password, user }) => {
    if (!user.password)
        throw new Error("Please enter your password!");
    const testPassword = await bcrypt.compare(password, user.password);
    if (!testPassword) {
        throw new Error("Email or password is wrong!");
    }
    return user;
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };