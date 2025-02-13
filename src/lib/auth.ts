import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"


const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            if (token.sub) {
                session.user.id = token.sub // ✅ Ajoute l'ID utilisateur dans la session
            }
            return session
        },

        async jwt({ token, user }) {
            if (user) token.sub = user.id // ✅ Stocke l'ID utilisateur dans le token
            return token
        },

    },
    pages: {
        signIn: "/login",
    },
    ...authConfig,

})