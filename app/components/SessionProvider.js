"use client"
import { SessionProvider } from "next-auth/react";

const SProvider = ({ children }) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default SProvider;