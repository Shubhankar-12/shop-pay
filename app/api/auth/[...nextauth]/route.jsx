import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../lib/mongodb";

export const authOptions = {
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
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
    // pages: {
    //     signIn: "/signin",
    // },
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };