import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { LoginSchema } from "./schemas/auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { AuthError, type NextAuthConfig } from "next-auth"


class customError extends AuthError {
    constructor(message: string) {
        super()
        this.message = message
    }
}

// ✅ Configuration des fournisseurs d'authentification
export default {
    providers: [
        Google,
        GitHub,
        Credentials({

            credentials: { email: {}, password: {} },

            authorize: async (credentials) => {

                // Validation des données reçues via votre schéma(par exemple avec Zod)
                const validated = LoginSchema.safeParse(credentials)

                // Retourner une erreur si les données ne sont pas valides
                if (!validated.success) {
                    throw new customError("Données invalides. Vérifiez votre saisie.")
                }

                // Vérifier si l'utilisateur existe dans la base de données
                const user = await prisma.user.findUnique({
                    where: { email: validated.data.email },
                })

                if (!user) {
                    throw new customError("Aucun compte trouvé avec cet e-mail.")
                }

                // Vérifier le mot de passe
                const isPasswordValid = await bcrypt.compare(validated.data.password, user.password || "")

                if (!isPasswordValid) {
                    throw new customError("Mot de passe incorrect.")
                }

                // Retourner l'utilisateur pour créer une session
                return user
            },
        })

    ]
} satisfies NextAuthConfig