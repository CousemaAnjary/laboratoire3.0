"use client"

import Navbar from "@/src/components/admin-panel/navbar"
import AppSidebar from "@/src/components/admin-panel/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"
import useSidebarToggle from "@/src/components/admin-panel/hooks/use-sidebar-toggle"


export default function Layout({ children }: { children: React.ReactNode }) {
    /**
     * ! STATE (état, données) de l'application
     */
    const { open, setOpen } = useSidebarToggle()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <SidebarProvider open={open} onOpenChange={setOpen}  className="bg-slate-100">
            <AppSidebar />
            <SidebarInset className="relative h-screen overflow-x-hidden bg-slate-100"> {/* Ajoutez overflow-x-hidden */}
                <Navbar />
                <main className="container py-8 sm:px-8"> {/* Ajoutez overflow-x-auto */}
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}