import { LucideIcon } from 'lucide-react'

// Type pour les sous-menus
export type Submenu = {
    href: string
    label: string
    active?: boolean // Peut être optionnel si tous les sous-menus ne sont pas toujours actifs par défaut
}

// Type pour les menus
export type Menu = {
    label: string
    href: string
    active?: boolean // Rend optionnel pour les menus sans état actif par défaut
    icon?: LucideIcon // Rend l'icône optionnelle au cas où un menu pourrait ne pas en avoir
    submenus?: Submenu[] // Rend optionnel si le menu ne contient pas toujours des sous-menus
}

// Type pour les groupes
export type Group = {
    groupLabel: string
    menus: Menu[]
}