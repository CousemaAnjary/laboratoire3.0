import { ScrollArea } from "../ui/scroll-area"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarSeparator } from "../ui/sidebar"
import HeaderSidebar from "./header-sidebar"

export default function AppSidebar() {
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
        <Sidebar variant="floating" collapsible="icon">
            {/* En-tête de la barre latérale */}
            <SidebarHeader>
                <HeaderSidebar />
            </SidebarHeader>

            <SidebarSeparator />

            {/* Contenu de la barre latérale */}
            <ScrollArea>
                <SidebarContent>
                    {/* <SidebarContentMenu menuGroups={menuGroups} /> */}
                </SidebarContent>
            </ScrollArea>

            {/* Pied de page de la barre latérale */}
            <SidebarFooter />
        </Sidebar>
    )
}