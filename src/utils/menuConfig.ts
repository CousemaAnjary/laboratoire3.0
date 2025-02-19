import { Group } from "../typeScript/menu"
import { LayoutDashboard, Receipt, SquareKanban } from "lucide-react"

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
                        label: "Kanban-board",
                        href: "/admin/dashboard/kanban",
                    },
                    {
                        label: "Facturation",
                        href: "/admin/dashboard/billing",
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
                href: "/admin/kanban",
                icon: SquareKanban,
            },
            {
                label: "Facturation",
                href: "/admin/billing",
                icon: Receipt,
            },

        ]
    }
]

export const menuItems = menuConfig