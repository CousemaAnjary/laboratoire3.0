"use server"

import { z } from "zod"
import { prisma } from "@/src/lib/prisma"
import { FacturationSchema } from "@/src/lib/schemas/facturation"



export async function createFacture(email: string, data: z.infer<typeof FacturationSchema>) {
    try {
        // Validation des données avec Zod
        const validated = FacturationSchema.safeParse(data)

        if (!validated.success) {
            throw new Error("Données invalides: " + validated.error.format())
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (user) {
            const facture = await prisma.invoice.create({
                data: {
                    name: validated.data.name,
                    userId: user.id,
                }
            })

            return {
                success: true,
                facture,
                message: "Facture créée avec succès",
            }
        }

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erreur interne du serveur",
        }
    }
}