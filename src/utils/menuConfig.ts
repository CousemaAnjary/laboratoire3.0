import { Group } from "../typeScript/menu"
import { LayoutDashboard, ShoppingBag, SquareKanban } from "lucide-react"

export const menuConfig: Group[] = [
    {
        groupLabel: "",
        menus: [
            {
                label: "Tableau de bord",
                href: "#",
                icon: LayoutDashboard,
                submenus: [
                    {
                        label: "E-commerce",
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
                label: "E commerce",
                href: "/applications/ecommerce",
                icon:ShoppingBag,
            },

        ]
    }
]

export const menuItems = menuConfig