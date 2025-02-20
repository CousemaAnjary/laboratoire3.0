import { Layers } from "lucide-react";

export default function Facturation() {
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
        <>
            <div className="mb-8 flex items-center justify-between rounded-md bg-white p-4 shadow-sm">
                <h1 className="font-spaceGrotesk font-medium text-gray-800">Mes factures en cours</h1>
            </div>

            <div className=" grid gap-4 md:grid-cols-3">
                <div
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border p-5 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
                    role="button"
                    aria-label="Créer une facture"
                >
                    <div className="font-bold text-gray-800">Créer une facture</div>
                    <div className="mt-3 flex items-center justify-center rounded-full bg-gray-200 p-3 transition-all duration-300 hover:bg-gray-300">
                        <Layers className="size-6 text-gray-700" />
                    </div>
                </div>

                {/* Liste des factures */}

            </div>


        </>
    )
}