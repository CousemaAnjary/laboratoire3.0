"use client"
import { useEffect } from "react"
import { cn } from "@/src/lib/utils"
import { toast, Toaster } from "sonner"
import Navbar from "@/src/components/navbar"
import { GridPattern } from "@/src/components/magicui/grid-pattern"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
        <div className="flex min-h-screen flex-col ">
            <GridPattern width={50} height={50} x={-1} y={-1} strokeDasharray={"4 2"} className={cn("absolute inset-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]")} />
            <Toaster richColors />
            {/* En-tête */}
            <header>
                <Navbar />
            </header>

            {/* Contenu principal */}
            <main className="grow">
                {/* Section 1 */}
                <section className="flex min-h-[84vh] items-center justify-center">
                    {children}
                </section>
            </main>

            {/* Pied de page */}
            <footer></footer>
        </div>
    )
}