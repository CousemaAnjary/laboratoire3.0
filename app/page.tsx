"use client"
import { cn } from "@/src/lib/utils"
import Navbar from "@/src/components/navbar"
import { GridPattern } from "@/src/components/magicui/grid-pattern"


export default function Home() {
  /**
   * ! STATE (état, données) de l'application
   */


  /**
   * ! COMPORTEMENT (méthodes, fonctions) de l'application
   */


  /**
   * ! AFFICHAGE (render) de l'application
   */
  return (
    <div className="flex min-h-screen flex-col">
      <GridPattern width={50} height={50} x={-1} y={-1} strokeDasharray={"4 2"} className={cn("absolute inset-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]")} />
      {/* En-tête */}
      <header>
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main className="grow">

      </main>

      {/* Pied de page */}
      <footer></footer>
    </div >
  )
}