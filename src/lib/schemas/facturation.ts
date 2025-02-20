import { z } from "zod"

export const FacturationSchema = z.object({
    name: z.string().nonempty("Le nom est obligatoire"),
})