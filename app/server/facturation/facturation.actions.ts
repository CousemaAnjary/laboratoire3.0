"use server"

import { z } from "zod"
import { randomBytes } from "crypto"
import { prisma } from "@/src/lib/prisma"
import { FacturationSchema } from "@/src/lib/schemas/facturation"


const generateUniqueId = async () => {
    let uniqueId
    let isUnique = false

    while (!isUnique) {
        uniqueId = randomBytes(3).toString('hex')
        const existingInvoice = await prisma.invoice.findUnique({
            where: { id: uniqueId }
        })
        if (!existingInvoice) {
            isUnique = true
        }
    }
    return uniqueId
}


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
                    id: await generateUniqueId() as string,
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