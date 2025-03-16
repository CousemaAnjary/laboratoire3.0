"use client"

import { z } from "zod"
// import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema } from "@/src/lib/schemas/auth"
import { Form, FormControl, FormField, FormItem } from "@/src/components/ui/form"
// import { sendResetPasswordEmail } from "@/app/server/auth/auth.actions"


export default function ForgotPassword() {
    /**
     * ! STATE (état, données) de l'application
     */

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    });


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleForgotPassword = async (data: z.infer<typeof ForgotPasswordSchema>) => {
        // try {
        //     const response = await sendResetPasswordEmail(data)

        //     if (!response.success) {
        //         toast.error(response.error)
        //         return
        //     }

        //     toast.success("Un lien de réinitialisation a été envoyé à votre adresse email.")

        // } catch (error) {
        //     console.error("Erreur lors de l'envoi du lien de réinitialisation :", error)
        // }
        console.log(data)
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative w-full max-w-md p-8 ">
                <h1 className="mb-4 font-spaceGrotesk text-2xl font-medium">Réinitialiser le mot de passe</h1>
                <p className="mb-4 text-muted-foreground">Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleForgotPassword)}>
                        <div className="grid gap-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field}
                                                    type="email"
                                                    placeholder="Entrez votre adresse email"
                                                    className="bg-white font-inter shadow-sm dark:bg-zinc-950"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-950">
                                Envoyer le lien de réinitialisation
                            </Button>
                        </div>
                    </form>
                </Form>

            </div>
        </>
    )
}