"use server"

import { z } from "zod"
import bcrypt from 'bcryptjs'
import { prisma } from "@/src/lib/prisma"
import { RegisterSchema } from "@/src/lib/schemas/auth"


export async function register(data: z.infer<typeof RegisterSchema>) {

    try {
        // Validation des données avec Zod
        const validated = RegisterSchema.safeParse(data)

        if (!validated.success) {
            throw new Error("Données invalides: " + validated.error.format())
        }

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email: validated.data.email },
        })

        if (existingUser) {
            throw new Error("Cet email est déjà utilisé.")
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(validated.data.password, 10)

        // Concatenation des champs firstname et lastname pour le champ name
        const fullName = `${validated.data.firstname} ${validated.data.lastname}`

        // Création de l'utilisateur
        const user = await prisma.user.create({
            data: {
                name: fullName,
                email: validated.data.email,
                password: hashedPassword,
            }
        })

        // Retourner l'utilisateur créé avec un message de succès
        return {
            user,
            success: true,
            message: "Utilisateur enregistré avec succès",
        }



    } catch (error) {
        console.error("Erreur lors de l'inscription :", error)
    }
}