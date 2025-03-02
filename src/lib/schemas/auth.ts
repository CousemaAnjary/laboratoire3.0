import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email("L'adresse email est invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const RegisterSchema = z.object({
    lastname: z.string().nonempty("Le nom est obligatoire"),
    firstname: z.string().nonempty("Le prénom est obligatoire"),
    email: z.string().email("L'adresse email est invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    // image: z
    //     // Vérifie que l’entrée est bien un fichier (File).
    //     .custom<File>((value) => value instanceof File, {
    //         message: "Le fichier doit être un fichier valide.",
    //     })

    //     //Vérifie que le fichier est une image (par exemple, image/png, image/jpeg)
    //     .refine((file) => file?.type.startsWith("image/"), {
    //         message: "Le fichier doit être une image.",
    //     })

    //     //Vérifie que la taille du fichier est inférieure à 5 Mo
    //     // .refine((file) => file?.size < 5 * 1024 * 1024, {
    //     //     message: "Le fichier doit être inférieur à 5 Mo.",
    //     // }),

    //     .optional()
})