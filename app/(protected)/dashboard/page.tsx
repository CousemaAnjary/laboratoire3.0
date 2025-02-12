"use client"

import { signIn, useSession } from "next-auth/react";

export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { data: session } = useSession()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>

            <button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
                Sign In
            </button>
        </>
    )
}