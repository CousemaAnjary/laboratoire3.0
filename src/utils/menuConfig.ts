import { Group } from "../typeScript/menu"
import { House, LayoutDashboard } from "lucide-react"

export const menuConfig: Group[] = [
    {
        groupLabel: "Tableaux de bord",
        menus: [
            {
                label: "Administration",
                href: "/administration",
                icon: House,
            },
            {
                label: "Tableau de bord",
                href: "#",
                icon: LayoutDashboard,
                submenus: [
                    {
                        label: "E-commerce",
                        href: "#",
                    },
                    {
                        label: "Kanban board",
                        href: "/tableau-de-board/kanban",
                    },
                ]
            },
        ]
    }
]

export const menuItems = menuConfig