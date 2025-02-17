import { Group } from "../typeScript/menu"
import { House } from "lucide-react"

export const menuItems: Group[] = [
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