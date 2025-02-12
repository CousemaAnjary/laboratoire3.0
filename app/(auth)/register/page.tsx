import { cn } from "@/src/lib/utils"
import Navbar from "@/src/components/navbar"
import RegisterForm from "@/src/components/auth/register-form"
import { GridPattern } from "@/src/components/magicui/grid-pattern"


export default function Register() {
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
        <div className="flex min-h-screen flex-col ">
                <GridPattern width={50} height={50} x={-1} y={-1} strokeDasharray={"4 2"} className={cn("absolute inset-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]")} />
                {/* <Toaster richColors /> */}
                {/* En-tête */}
                <header>
                    <Navbar />
                </header>

                {/* Contenu principal */}
                <main className="grow">
                    {/* Section 1 */}
                    <section className="flex min-h-[84vh] items-center justify-center">
                        {/*  container du formulaire de connexion */}
                        <RegisterForm />
                    </section>
                </main>

                {/* Pied de page */}
                <footer></footer>
            </div>
    )
}