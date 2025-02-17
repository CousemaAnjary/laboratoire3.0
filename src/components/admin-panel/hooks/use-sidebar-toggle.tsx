"use client"

import { useEffect, useState } from "react"

// Clé pour le localStorage
const SIDEBAR_STATE_KEY = "sidebarState"

export default function useSidebarToggle() {
    /**
     * ! STATE (état, données) de l'application
     */
    // Initialiser l'état `open` en récupérant la valeur depuis `localStorage`
    const [open, setOpen] = useState(() => {
        const savedState = localStorage.getItem(SIDEBAR_STATE_KEY)
        return savedState ? JSON.parse(savedState) : true // Par défaut, la barre latérale est ouverte
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // Sauvegarder l'état dans `localStorage` à chaque changement
    useEffect(() => {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(open))
    }, [open])

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return { open, setOpen }
}