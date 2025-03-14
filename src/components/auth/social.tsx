"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { authClient } from "@/src/lib/auth-client"

//  Définir le type strict pour les providers autorisés
type AuthProvider = "github" | "google" | "apple" | "discord" | "facebook" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick";


export default function Social() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [loadingProvider, setLoadingProvider] = useState<AuthProvider | null>(null);

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleProviderLogin = async (provider: AuthProvider) => {
        setLoadingProvider(provider)

        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/dashboard",
            })

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
