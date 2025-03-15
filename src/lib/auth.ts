import { prisma } from "./prisma"
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { prismaAdapter } from "better-auth/adapters/prisma"


export const auth = betterAuth({

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Réinitialisation du mot de passe",
                text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe: ${url}`,
            })
        }
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    plugins: [nextCookies()]
})