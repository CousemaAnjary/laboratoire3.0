"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { ResetPasswordSchema } from "@/src/lib/schemas/auth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { auth } from "@/src/lib/auth"



export default function ResetPassword() {
    /**
     * ! STATE (état, données) de l'application
     */
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: ""
        },
    });

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleResetPassword = async (data:z.infer<typeof ResetPasswordSchema>) => {
        if (!token) {
            toast.error("Token invalide !")
            return
        }

        try { 
            await auth.api.resetPassword({ body: { token, newPassword: data.newPassword } });
            toast.success("Mot de passe réinitialisé !")
            router.push("/login")

        } catch (error) {
            console.error("Erreur lors de la réinitialisation du mot de passe :", error)
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative w-full max-w-md p-8">
                <h1 className="mb-4 text-2xl font-medium ">Nouveau mot de passe</h1>
                <p className="mb-4 text-muted-foreground">Saisissez un nouveau mot de passe sécurisé.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleResetPassword)}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-9 gap-2">
                                <div className="col-span-8 grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Nouveau mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type={showPassword ? "text" : "password"} placeholder="Entrez votre nouveau mot de passe" className="bg-white font-inter shadow-sm dark:bg-zinc-950" />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mb-1 grid">
                                    <Button type="button" variant="outline" size={"icon"} className="mt-8" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="confirmNewPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Confirmez le nouveau mot de passe</FormLabel>
                                            <FormControl>
                                                <Input {...field} type={showPassword ? "text" : "password"} placeholder="Retapez votre nouveau mot de passe" className="bg-white font-inter shadow-sm dark:bg-zinc-950" />
                                            </FormControl>
                                            <FormMessage className="font-inter" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-950">
                                Réinitialiser le mot de passe
                            </Button>
                        </div>
                    </form>
                </Form>

            </div>
        </>
    )
}