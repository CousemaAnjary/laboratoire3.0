"use client"

import { useEffect } from "react"
import { toast, Toaster } from "sonner"


export default function Dashboard() {
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
        <>
          <Toaster richColors />
          
        </>
    )
}