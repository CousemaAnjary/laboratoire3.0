"use server"
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "@/data/user"
import { NextRequest, NextResponse } from "next/server"
import { RegisterSchema } from "@/src/lib/schemas/auth"
import { prisma } from '@/src/lib/prisma'


export async function POST(request: NextRequest) {
    try {
        // Récupérer les données et valider les données envoyées
        const body = await request.json()
        const validated = RegisterSchema.safeParse(body)

        if (!validated.success) {
            return NextResponse.json({ error: "Données invalides", details: validated.error.format() }, { status: 400 })
        }

        // Vérifier si l'email existe déjà
        const existingUser = await getUserByEmail(validated.data.email)

        // Retourner une erreur si l'utilisateur existe déjà
        if (existingUser) {
            return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 })
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(validated.data.password, 10)

        // Concatenation des champs firstname et lastname pour le champ name
        const fullName = `${validated.data.firstname} ${validated.data.lastname}`

        // Création de l'utilisateur
        const newUser = await prisma.user.create({
            data: {
                name: fullName,
                email: validated.data.email,
                password: hashedPassword,
            }
        })

        // Retourner l'utilisateur créé
        return NextResponse.json({ message: "Utilisateur enregistré avec succès", newUser }, { status: 201 })

    } catch (error) {
        console.error("Erreur serveur:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
    }
}