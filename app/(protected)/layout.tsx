"use client"

import Navbar from "@/src/components/admin-panel/navbar"
import AppSidebar from "@/src/components/admin-panel/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"
import { useSidebarStore } from "@/src/components/admin-panel/hooks/use-sidebar-toggle";


export default function Layout({ children }: { children: React.ReactNode }) {
    /**
     * ! STATE (état, données) de l'application
     */
    const { open, setOpen, isHydrated } = useSidebarStore();

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // ✅ Bloque le rendu jusqu'à ce que Zustand ait bien récupéré `localStorage`
    if (!isHydrated) return null;

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <SidebarProvider open={open} onOpenChange={setOpen} className="bg-slate-100">
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