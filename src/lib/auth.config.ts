import bcrypt from 'bcryptjs';
import { LoginSchema } from "./schemas/auth"
import { getUserByEmail } from "@/data/user"
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

// ✅ Configuration des fournisseurs d'authentification
export default {
    providers: [
        Google,
        GitHub,
        Credentials({

            credentials: { email: {}, password: {} },

            authorize: async (credentials) => {

                try {
                    // Validation des données reçues via votre schéma(par exemple avec Zod)
                    const validated = LoginSchema.safeParse(credentials)

                    // Retourner une erreur si les données ne sont pas valides
                    if (!validated.success) {
                        throw new Error("Données invalides. Vérifiez votre saisie.")
                    }

                    // Vérifier si l'utilisateur existe dans la base de données
                    const user = await getUserByEmail(validated.data.email)

                    if (!user) {
                        throw new Error("Aucun compte trouvé avec cet e-mail.")
                    }

                    // Vérifier le mot de passe
                    const isPasswordValid = await bcrypt.compare(validated.data.password, user.password || "")

                    if (!isPasswordValid) {
                        throw new Error("Mot de passe incorrect.")
                    }

                    // Retourner l'utilisateur pour créer une session
                    return user
                    
                } catch (error) {
                    // Retourner une erreur si quelque chose ne va pas
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    } else {
                        throw new Error("Une erreur inconnue s'est produite.");
                    }
                }
            },
        })

    ]
} satisfies NextAuthConfig