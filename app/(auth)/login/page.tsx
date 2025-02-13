"use client"
import { toast } from "sonner"
import { useEffect } from "react"
import LoginForm from "@/src/components/auth/login-form"


export default function Login() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    useEffect(() => {
        // Récupération du message de succès dans le localStorage
        const message = localStorage.getItem("success")

        if (message) {
            // Affichage du message de succès
            toast.success(message)
            localStorage.removeItem("success")
        }
    }, [])

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div>
            <LoginForm />
        </div>
    )
}