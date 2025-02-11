"use client"
import { useTheme } from "next-themes"
import { Monitor, MoonStar, Sun } from "lucide-react"


export default function ThemeSwitcher() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { theme, setTheme } = useTheme()


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="flex items-center space-x-2 rounded-full border p-1 px-2">
            <Sun
                className={`cursor-pointer transition-all duration-300 ${theme === "light" ? "rounded-full border p-1" : "size-4"
                    }`}
                onClick={() => setTheme("light")}
            />
            <Monitor
                className={`cursor-pointer transition-all duration-300 ${theme === "system" ? "rounded-full border p-1" : "size-4"
                    }`}
                onClick={() => setTheme("system")}
            />
            <MoonStar
                className={`cursor-pointer transition-all duration-300 ${theme === "dark" ? "rounded-full border p-1" : "size-4"
                    }`}
                onClick={() => setTheme("dark")}
            />
        </div>
    )
}