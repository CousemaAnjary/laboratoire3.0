import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"
import UserDropdownMenu from "./user-dropdown-menu"

export default function Navbar() {
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
        <nav className="sticky top-0 z-50 flex items-center justify-between py-4 backdrop-blur-lg">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <DynamicBreadcrumb /> */}
            </div>
            <div className="me-10 flex justify-end space-x-3">
                <UserDropdownMenu />
            </div>
        </nav>
    )
}