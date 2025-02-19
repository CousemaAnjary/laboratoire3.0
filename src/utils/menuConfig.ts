import { Group } from "../typeScript/menu"
import { LayoutDashboard, Receipt,  SquareKanban } from "lucide-react"

export const menuConfig: Group[] = [
    {
        groupLabel: "Tableaux de bord",
        menus: [
            {
                label: "Tableau de bord",
                href: "#",
                icon: LayoutDashboard,
                submenus: [
                    {
                        label: "E commerce",
                        href: "#",
                    },
                ]
            },
        ]
    },
    {
        groupLabel: "Applications",
        menus: [
            {
                label: "Kanban",
                href: "/applications/kanban",
                icon: SquareKanban,
            },
            {
                label: "Facturation",
                href: "/applications/facturation",
                
                icon:Receipt ,
            },

        ]
    }
]

export const menuItems = menuConfig