"use server"

import { z } from "zod"
import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { LoginSchema, RegisterSchema } from "@/src/lib/schemas/auth"

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

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) {
            return { success: false, error: "Un compte existe déjà avec cette adresse e-mail" }
        }

        // Concatenation des champs firstname et lastname pour le champ name
        const fullName = `${lastname} ${firstname}`.trim()

        // Création de l'utilisateur
        await auth.api.signUpEmail({
            body: { email, password, name: fullName },
        })


        // Retourner l'utilisateur créé avec un message de succès
        return { success: true, message: "Inscription réussie" }

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
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." };
    }
}
