import Navbar from "@/src/components/admin-panel/navbar"
import AppSidebar from "@/src/components/admin-panel/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"


export default function layout({ children }: { children: React.ReactNode }) {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <SidebarProvider className="bg-slate-100">
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