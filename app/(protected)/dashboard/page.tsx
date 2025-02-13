"use client"
import { Button } from "@/src/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import { toast, Toaster } from "sonner"


export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { data: session } = useSession()

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
            <h1>Dashboard</h1>
            <p>ID de session: {session?.user?.id}</p>
            <p>Welcome {session?.user?.name}</p>
            <Button onClick={() => signOut()}>Sign Out</Button>
        </>
    )
}