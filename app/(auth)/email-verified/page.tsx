"use client"

import { Button } from "@/src/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/src/components/ui/input-otp"
import { toast } from "sonner"


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
            <div className="relative w-full max-w-md p-8 text-center">
                <h1 className="mb-4 font-spaceGrotesk text-2xl font-medium">Vérifier votre adresse email</h1>

                <p className="mb-4 font-spaceGrotesk text-sm text-muted-foreground">
                    Un code de vérification à 6 chiffres a été envoyé à votre adresse e-mail.
                    Veuillez entrer ce code ci-dessous pour confirmer votre compte.
                </p>

                <form>
                    <div className="mb-4 flex justify-center">
                        <InputOTP maxLength={6} autoFocus>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="bg-white font-inter" />
                                <InputOTPSlot index={1} className="bg-white font-inter" />
                                <InputOTPSlot index={2} className="bg-white font-inter" />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} className="bg-white font-inter" />
                                <InputOTPSlot index={4} className="bg-white font-inter" />
                                <InputOTPSlot index={5} className="bg-white font-inter" />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button type="submit" className="w-full bg-blue-900 font-inter hover:bg-blue-950">
                        Confirmer le code
                    </Button>

                    {/* ✅ Message en cas de non-réception */}
                    <p className="mt-4 font-inter text-sm text-gray-600">
                        Vous n&apos;avez pas reçu le code ?{" "}
                        <button
                            type="button"
                            className="font-spaceGrotesk text-blue-600 hover:underline"
                            onClick={() => toast.info("Un nouveau code a été envoyé.")}
                        >
                            Renvoyer le code
                        </button>
                    </p>
                </form>
            </div>
        </>
    )
}