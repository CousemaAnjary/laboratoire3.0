"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema } from "@/src/lib/schemas/auth"


export default function ForgotPassword() {
    /**
     * ! STATE (état, données) de l'application
     */

    const form = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: { email: "" },
    });


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleForgotPassword = async (data: { email: string }) => {
        console.log(data)
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="w-full max-w-md p-8">
                <h1 className="mb-4 text-2xl font-medium">Réinitialiser le mot de passe</h1>
                <p className="mb-4 text-muted-foreground">Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>

                <form onSubmit={form.handleSubmit(handleForgotPassword)}>
                    <div className="grid gap-4">
                        <div>
                            <Input
                                {...form.register("email")}
                                placeholder="Votre email"
                                type="email"
                                className="bg-white font-inter shadow-sm"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-950">
                            Envoyer le lien de réinitialisation
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}