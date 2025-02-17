import { CodeXml } from "lucide-react"

import { SidebarMenuButton } from "../ui/sidebar"


export default function HeaderSidebar() {
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
        <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-blue-900 text-sidebar-primary-foreground hover:bg-blue-900">
                <CodeXml className="size-4" />
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    Laboratoire
                </span>
            </div>
        </SidebarMenuButton>
    )
}