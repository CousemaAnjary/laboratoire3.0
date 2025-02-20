"use server"

import { z } from "zod"
import { prisma } from "@/src/lib/prisma"
import { FacturationSchema } from "@/src/lib/schemas/facturation"



export async function createFacture(email: string, data: z.infer<typeof FacturationSchema>) {
    try {
        // Validation des données avec Zod
        const validated = FacturationSchema.safeParse(data)

        if (!validated.success) {
            return { success: false, error: "Données invalides" }
        }

        // 🔹 Vérification de l'utilisateur
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return { success: false, error: "Utilisateur introuvable" }
        }

        // 🔹 Création de la facture dans une transaction pour assurer l'intégrité
        const facture = await prisma.$transaction(async (prisma) => {
            return await prisma.invoice.create({
                data: {
                    name: validated.data.name,
                    userId: user.id,
                },
            })
        })

        return {
            success: true,
            facture,
            message: "Facture créée avec succès",
        }


    } catch (error) {
        console.error("Erreur lors de la création de la facture:", error);
    }
}