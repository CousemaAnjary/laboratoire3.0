import { z } from "zod"

export const FacturationSchema = z.object({
    name: z.string()
        .nonempty("Le nom est obligatoire")
        .max(40, "Le nom ne peut pas dépasser 40 caractères"),
});