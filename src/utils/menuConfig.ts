import { Group } from "../typeScript/menu"
import { Key, LayoutDashboard, Receipt, Settings2, SquareKanban, Users } from "lucide-react"

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
    },
    // Groupe de menus pour les paramètres
    {
        groupLabel: "Paramètres",
        menus: [
            {
                label: "Configurations",
                href: "#",
                icon: Settings2,
            },
            {
                label: "Droit d'accès",
                href: "/droit-acces",
                icon: Key,
              
            },
            {
                label: "Rôles et Permissions",
                href: "/roles-permissions",
                icon: Users,
            }
        ]
    },
]

export const menuItems = menuConfig