import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_APP_GITHUB_ID,
            clientSecret: process.env.NEXT_APP_GITHUB_SECRET,
        }),

    ],
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };