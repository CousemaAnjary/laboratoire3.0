import { buttonVariants } from "@/src/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EmailVerified() {
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
            <div className="relative flex grow flex-col items-center justify-center p-6">
                <CheckCircle className="mb-4 size-16 text-green-500" />
                <h1 className="mb-2 text-2xl font-bold text-green-600">
                    Email vérifié avec succès !
                </h1>

                <p className="mb-4 text-center text-gray-700">
                    Votre adresse e-mail a été confirmée. Vous pouvez maintenant profiter pleinement de nos services.
                </p>
                
                <Link
                    href="/"
                    className={buttonVariants({
                        variant: "default",
                    })}
                >
                    Retour à l&apos;accueil
                </Link>
            </div>
        </>
    )
}