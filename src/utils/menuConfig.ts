import { Group } from "../typeScript/menu"
import { House } from "lucide-react"

export const menuConfig: Group[] = [
    {
        groupLabel: "Tableaux de bord",
        menus: [
            {
                label: "Administration",
                href: "/administration",
                icon: House,
            }
        ]
    }
]

export const menuItems = menuConfig