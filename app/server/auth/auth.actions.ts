"use server"

import { z } from "zod"
import { auth } from "@/src/lib/auth"
import { cookies } from "next/headers"
import { prisma } from "@/src/lib/prisma"
import { LoginSchema, RegisterSchema, VerifyEmailSchema } from "@/src/lib/schemas/auth"


// Enregistrement d'un nouvel utilisateur
export async function register(data: z.infer<typeof RegisterSchema>) {
    try {
        // Validation des données avec Zod
        const validated = RegisterSchema.safeParse(data)

        if (!validated.success) {
            return { success: false, error: "Données invalides", details: validated.error.format() }
        }

        // Extraire les données validées
        const { email, password, lastname, firstname } = validated.data
        const fullName = `${lastname} ${firstname}`.trim()

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email },
            select: { id: true } // Ne récupérer que l'ID pour optimiser la requête
        })

        if (existingUser) {
            return { success: false, error: "Un compte existe déjà avec cette adresse e-mail" }
        }

        // Création de l'utilisateur
        await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        // Envoyer l'OTP **en tâche de fond** pour ne pas bloquer l'inscription
        setTimeout(async () => {
            await auth.api.sendVerificationOTP({ body: { email, type: "email-verification" } })
        }, 0)

        //  Stocker l'email temporairement et rediriger vers `/verify-email`
        const cookieStore = await cookies()
        cookieStore.set("emailToVerify", email, { httpOnly: true, secure: true });

        // Retourner l'utilisateur créé avec un message de succès
        return { success: true, message: "Inscription réussie. Vérifiez votre email." }

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error)
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." }
    }
}


// Connexion d'un utilisateur
export async function login(data: z.infer<typeof LoginSchema>) {
    try {
        // Validation des données reçues via votre schéma (Zod)
        const validated = LoginSchema.safeParse(data);

        if (!validated.success) {
            return { success: false, error: "Données invalides", details: validated.error.format() };
        }

        // Extraire les données validées
        const { email, password } = validated.data;

        // Vérifier si l'utilisateur existe dans la base de données
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return { success: false, error: "Aucun compte n'est associé à cette adresse e-mail" };
        }


        // Better Auth gérer la vérification du mot de passe
        await auth.api.signInEmail({
            body: { email, password },
        });

        return { success: true, message: "Connexion réussie" };

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return { success: false, error: "Le mot de passe est incorrect. Veuillez réessayer." };
    }
}


// Vérification de l'email
export async function verifyEmail(data: z.infer<typeof VerifyEmailSchema>) {
    try {
        // Validation des données reçues via votre schéma (Zod)
        const validated = VerifyEmailSchema.safeParse(data);

        if (!validated.success) {
            return { success: false, error: "Données invalides", details: validated.error.format() }
        }

        // Récupérer l'email stocké temporairement
        const cookieStore = await cookies()
        const email = cookieStore.get("emailToVerify")?.value

        if (!email) {
            return { success: false, error: "Impossible de récupérer votre adresse e-mail." }
        }

        // extraire le code OTP de la requête
        const { pin } = validated.data

        // Vérifier l'email avec Better Auth
        await auth.api.verifyEmailOTP({ body: { email, otp: pin } })

        // Supprimer les données stockées après validation
        cookieStore.delete("emailToVerify")

        return { success: true, message: "Votre adresse email a été vérifiée avec succès." }

    } catch (error) {
        console.error("Erreur lors de la vérification de l'email :", error);
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." };
    }
}




