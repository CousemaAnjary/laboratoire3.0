// "use server"

// import { z } from "zod"
// import bcrypt from 'bcryptjs'
// // import { signIn } from "@/src/lib/auth"
// import { prisma } from "@/src/lib/prisma"
// import { LoginSchema, RegisterSchema } from "@/src/lib/schemas/auth"


// // Enregistrement d'un nouvel utilisateur
// export async function register(data: z.infer<typeof RegisterSchema>) {

//     try {
//         // Validation des données avec Zod
//         const validated = RegisterSchema.safeParse(data)

//         if (!validated.success) {
//             throw new Error("Données invalides: " + validated.error.format())
//         }

//         // Vérifier si l'email existe déjà
//         const existingUser = await prisma.user.findUnique({
//             where: { email: validated.data.email },
//         })

//         if (existingUser) {
//             throw new Error("L'adresse e-mail fournie est déjà associée à un compte existant.")
//         }

//         // Hachage du mot de passe
//         const hashedPassword = await bcrypt.hash(validated.data.password, 10)

//         // Concatenation des champs firstname et lastname pour le champ name
//         const fullName = `${validated.data.firstname} ${validated.data.lastname}`

//         // Création de l'utilisateur
//         const user = await prisma.user.create({
//             data: {
//                 name: fullName,
//                 email: validated.data.email,
//                 password: hashedPassword,
//             }
//         })

//         // Retourner l'utilisateur créé avec un message de succès
//         return {
//             user,
//             success: true,
//             message: "Utilisateur enregistré avec succès",
//         }

//     } catch (error) {
//         return {
//             success: false,
//             error: error instanceof Error ? error.message : "Erreur interne du serveur",
//         }
//     }
// }


// // Connexion d'un utilisateur
// export async function login(data: z.infer<typeof LoginSchema>) {

//     try {

//         // await signIn("credentials", {
//         //     email: data.email,
//         //     password: data.password,
//         //     redirect: false
//         // })

//         // Retourner un message de succès
//         return {
//             success: true,
//             message: "Vous êtes connecté avec succès",
//         }

//     } catch (error) {
//         return {
//             success: false,
//             error: error instanceof Error ? error.message : "Erreur interne du serveur",
//         }
//     }
// }