import { prisma } from "./prisma"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"


export const auth = betterAuth({
    // Use the Prisma adapter to store user data
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },
});