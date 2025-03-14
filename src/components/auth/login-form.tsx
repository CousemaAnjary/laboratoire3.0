"use client"

import { z } from "zod"
import Link from "next/link"
import Social from "./social"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { LoginSchema } from "@/src/lib/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/app/server/auth/auth.actions"
import { AtSign, Eye, EyeOff, Loader, LockKeyhole } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"


export default function LoginForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false)


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
        // Affichage du loader pendant le chargement
        setLoading(true)

        try {
            const response = await login(data)

            if (!response.success) {
                toast.error(response.error)
                return
            }

            //  Rafraîchir la session et rediriger sans bloquer l'UI
            startTransition(() => {
                router.replace("/dashboard"); // Remplace avec ta route par défaut
            });

        } catch (error) {
            console.error("Erreur lors de la connexion :", error)

        } finally {
            setLoading(false)
        }
    }
    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="relative w-full max-w-md p-8">
            <h1 className="mb-2 font-spaceGrotesk text-2xl font-medium ">Se connecter</h1>
            <p className="mb-4">
                Connectez-vous à votre compte pour accéder à votre espace personnel
            </p>
            <p className="mb-4 font-spaceGrotesk  text-sm font-medium text-muted-foreground">
                Vous n&apos;avez pas de compte ? Inscrivez-vous en cliquant <Link href="/register" className="text-cyan-700 underline">ici</Link>
            </p>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleLogin)}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Adresse email </FormLabel>
                                        <FormControl>
                                            {/* Conteneur pour l'input et l'icône */}
                                            <div className="relative ">
                                                <Input type="email" {...field} placeholder="exemple@gmail.com" className="bg-white ps-10 font-inter shadow-sm dark:bg-zinc-950" />
                                                {/* Icône */}
                                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/95 peer-disabled:opacity-50">
                                                    <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="font-inter" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-9 gap-2">
                            <div className="col-span-8 grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Mot de passe</FormLabel>
                                            <FormControl>
                                                {/* Conteneur pour l'input et l'icône */}
                                                <div className="relative ">
                                                    <Input {...field} type={showPassword ? "text" : "password"} placeholder="Entrez votre mot de passe" className="bg-white ps-10 font-inter shadow-sm dark:bg-zinc-950" />
                                                    {/* Icône */}
                                                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/95 peer-disabled:opacity-50">
                                                        <LockKeyhole size={16} strokeWidth={2} aria-hidden="true" />
                                                    </div>
                                                </div>

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

                        <div className="grid">
                            <Button type="submit" className="w-full font-inter" disabled={loading}>
                                {loading || isPending ? (
                                    <>
                                        <Loader className="mr-2 size-4 animate-spin" />
                                        Veuillez patienter
                                    </>
                                ) : (
                                    "Connexion"
                                )}

                            </Button>
                        </div>
                        <div className="relative">
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 font-inter text-muted-foreground">Ou continuer avec</span>
                            </div>
                        </div>

                        <Social />
                    </div>
                </form>
            </Form>
        </div>
    )
}