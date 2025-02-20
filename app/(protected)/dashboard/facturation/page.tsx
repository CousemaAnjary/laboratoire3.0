import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

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
            <div className="mb-8  flex w-full items-center justify-between rounded-md bg-white p-4 shadow-sm">
                <h1 className="font-spaceGrotesk font-medium text-gray-800">Mes factures en cours</h1>
            </div>

            <div className="grid cursor-pointer gap-4 md:grid-cols-3">
                <Card className="rounded-sm  border-dashed border-slate-300 bg-transparent shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-inter font-medium">Créer une facture</CardTitle>
                        <CardDescription className="font-spaceGrotesk">Créer une nouvelle facture pour un client</CardDescription>
                    </CardHeader>
                </Card>

                {/* Liste des factures */}

            </div>


        </>
    )
}