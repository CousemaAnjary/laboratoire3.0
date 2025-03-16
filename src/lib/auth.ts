import { prisma } from "./prisma"
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { emailOTP, openAPI } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { sendEmail } from "@/app/server/auth/email.actions"


export const auth = betterAuth({

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
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
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                let subject = "Votre code de vérification"
                let text = `Votre code de vérification est : ${otp}. Ce code expirera dans 10 minutes.`;

                if (type === "sign-in") {
                    subject = "Connexion avec OTP";
                    text = `Utilisez ce code pour vous connecter : ${otp}.`;

                } else if (type === "forget-password") {
                    subject = "Réinitialisation de mot de passe";
                    text = `Utilisez ce code pour réinitialiser votre mot de passe : ${otp}.`;
                }
                
                await sendEmail({
                    to: email,
                    subject,
                    text,
                })
            },
            otpLength: 6, // Code OTP à 6 chiffres
            expiresIn: 600, // Code OTP expirant après 10 minutes
            sendVerificationOnSignUp: true, // Envoyer automatiquement un OTP après inscription
        }),
        nextCookies(),
    ]
})