import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface SidebarState {
    open?: boolean // `undefined` au début pour attendre `localStorage`
    toggleSidebar: () => void;
    setOpen: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            open: undefined, //  Laisse Zustand attendre `localStorage`
            toggleSidebar: () => set((state) => ({ open: !state.open })),
            setOpen: (value) => set({ open: value }),
        }),
        {
            name: "sidebar-storage",
            storage: createJSONStorage(() => localStorage), //  Assure une gestion propre avec Zustand
        }
    )
);
