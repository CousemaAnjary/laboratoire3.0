"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { DEFAULT_LOGIN_REDIRECT } from "@/middleware"


export default function Social() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleProviderLogin = async (provider: string) => {
        setLoadingProvider(provider)

        try {
            await signIn(provider, { redirect: true, callbackUrl: DEFAULT_LOGIN_REDIRECT })

        } catch (error) {
            console.error("Erreur lors de la connexion avec le fournisseur :", error)

        } finally {
            setLoadingProvider(null)
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="grid grid-cols-2 gap-2">
            {/* Bouton Google */}
            <Button
                type="button"
                variant="outline"
                className="flex w-full items-center justify-center gap-2 font-inter"
                onClick={() => handleProviderLogin("google")}
                disabled={loadingProvider === "google"}
            >
                {loadingProvider === "google" ? (
                    <>
                        <Loader className="size-4 animate-spin" />
                        Google
                    </>
                ) : (
                    <>
                        <FcGoogle size={18} />
                        Google
                    </>
                )}
            </Button>

            {/* Bouton GitHub */}
            <Button
                type="button"
                variant="outline"
                className="flex w-full items-center justify-center gap-2 font-inter"
                onClick={() => handleProviderLogin("github")}
                disabled={loadingProvider === "github"}
            >
                {loadingProvider === "github" ? (
                    <>
                        <Loader className="size-4 animate-spin" />
                        GitHub
                    </>
                ) : (
                    <>
                        <FaGithub size={18} />
                        GitHub
                    </>
                )}
            </Button>
        </div>
    );
}
