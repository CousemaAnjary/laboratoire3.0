import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarState {
    open: boolean;
    isHydrated: boolean;
    toggleSidebar: () => void;
    setOpen: (value: boolean) => void;
    setHydrated: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set, get) => ({
            open: true, // ⚠️ L'état par défaut peut provoquer un flash si `localStorage` n'est pas encore chargé
            isHydrated: false, // ✅ Ajout pour savoir si Zustand a récupéré `localStorage`
            toggleSidebar: () => set({ open: !get().open }),
            setOpen: (value) => set({ open: value }),
            setHydrated: (value) => set({ isHydrated: value }),
        }),
        {
            name: "sidebar-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) state.setHydrated(true); // ✅ Zustand est hydraté après récupération de `localStorage`
            },
        }
    )
);
