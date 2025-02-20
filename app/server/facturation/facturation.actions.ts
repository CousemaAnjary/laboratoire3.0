"use server"

import { z } from "zod"
import { FacturationSchema } from "@/src/lib/schemas/facturation"


export async function createFacture(email: string, data: z.infer<typeof FacturationSchema>) {
    try {
        // Validation des données avec Zod
        const validated = FacturationSchema.safeParse(data)

        if (!validated.success) {
            throw new Error("Données invalides: " + validated.error.format())
        }

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erreur interne du serveur",
        }
    }
}