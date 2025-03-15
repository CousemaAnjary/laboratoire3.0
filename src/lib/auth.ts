import { prisma } from "./prisma"
import { betterAuth } from "better-auth"
import { openAPI } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { sendEmail } from "@/app/server/auth/email.actions"



export const auth = betterAuth({

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        // sendResetPassword: async ({ user, url }) => {
        //     await sendEmail({
        //         to: user.email,
        //         subject: "Réinitialisation du mot de passe",
        //         text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe: ${url}`,
        //     })
        // }
    },

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`
            await sendEmail({
                to: user.email,
                subject: "Vérification de l'adresse email",
                text: `Cliquez sur le lien suivant pour vérifier votre adresse email: ${verificationUrl}`,
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

    plugins: [
        openAPI(), // Expose an OpenAPI schema at /api/auth/reference
        nextCookies(),
    ]
})