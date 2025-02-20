import { z } from "zod"

export const FacturationSchema = z.object({
    name: z.string().max(40, "Le nom de la facture ne doit pas dépasser 50 caractères"),
})