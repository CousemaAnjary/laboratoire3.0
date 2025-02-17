import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
    open: boolean;
    toggleSidebar: () => void;
    setOpen: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set, get) => ({
            open: true, // Par défaut ouvert
            toggleSidebar: () => set({ open: !get().open }), // Inverse l'état
            setOpen: (value) => set({ open: value }), // Définit l'état
        }),
        {
            name: "sidebar-storage", // 🔄 Clé utilisée dans `localStorage`
        }
    )
)
