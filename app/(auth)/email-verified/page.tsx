"use client"

import { z } from "zod"
import { toast } from "sonner"
import { cookies } from "next/headers"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/src/lib/auth-client"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/src/components/ui/input-otp"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/src/components/ui/form"


const OTP_EXPIRATION_TIME = 600 // 10 minutes en secondes
const RESEND_COOLDOWN_TIME = 30 // 30 secondes avant de renvoyer un OTP

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Le code de vérification doit contenir au moins 6 chiffres.",
    }),
})

export default function EmailVerified() {
    /**
     * ! STATE (état, données) de l'application
     */
    const router = useRouter()

    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = parseInt(localStorage.getItem("otpExpiration") || "0", 10);
        const now = Math.floor(Date.now() / 1000); // Temps actuel en secondes
        return savedTime > now ? savedTime - now : OTP_EXPIRATION_TIME;
    })

    const [resendCooldown, setResendCooldown] = useState(() => {
        return parseInt(localStorage.getItem("resendCooldown") || "0", 10);
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */

    // Compter le temps restant pour l'expiration du code OTP
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    const newTime = prev - 1;
                    localStorage.setItem("otpExpiration", (Math.floor(Date.now() / 1000) + newTime).toString()); // ✅ Sauvegarde dynamique
                    return newTime
                })
            }, 1000)
            return () => clearInterval(timer)
        } else {
            toast.error("Le code OTP a expiré. Veuillez demander un nouveau code.")
        }
    }, [timeLeft])


    // Compter le temps restant pour le renvoi du code OTP
    useEffect(() => {
        if (resendCooldown > 0) {
            localStorage.setItem("resendCooldown", resendCooldown.toString()) //  Sauvegarder la valeur
            const timer = setInterval(() => {
                setResendCooldown((prev) => {
                    if (prev <= 1) {
                        localStorage.removeItem("resendCooldown") //  Supprimer une fois terminé
                        return 0;
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [resendCooldown])


    // Vérifier le code OTP
    const handleVerifyOtp = async (data: z.infer<typeof FormSchema>) => {
        const cookieStore = await cookies()
        const email = cookieStore.get("emailToVerify")?.value;


        if (!email) {
            toast.error("Erreur : Impossible de récupérer votre adresse e-mail.");
            return
        }

        //  Vérifier le code OTP
        try {
            const response = await authClient.emailOtp.verifyEmail({
                email,
                otp: data.pin,
            })
            if (response.error) {
                toast.error(response.error.message);
                return
            }

            toast.success("Votre adresse email a été vérifiée avec succès.")
            router.push("/dashboard")

            // Supprimer les données stockées après validation
            localStorage.removeItem("emailToVerify")
            localStorage.removeItem("otpExpiration")

        } catch (error) {
            console.error("Erreur lors de la vérification de l'adresse email :", error)
        }
    }

    // Renvoyer le code OTP
    const handleResendOtp = async () => {
        if (resendCooldown > 0) return

        const email = localStorage.getItem("emailToVerify")
        if (!email) {
            toast.error("Erreur : Impossible de récupérer votre adresse e-mail.");
            return
        }

        await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "email-verification",
        })

        toast.success("Un nouveau code a été envoyé.")
        setResendCooldown(RESEND_COOLDOWN_TIME)
        localStorage.setItem("resendCooldown", RESEND_COOLDOWN_TIME.toString()) //  Sauvegarder le cooldown
        setTimeLeft(OTP_EXPIRATION_TIME) //  Réinitialiser l'expiration de l'OTP

        // Stocker l’heure d'expiration du nouvel OTP
        const newExpiration = Math.floor(Date.now() / 1000) + OTP_EXPIRATION_TIME;
        localStorage.setItem("otpExpiration", newExpiration.toString());
        setTimeLeft(OTP_EXPIRATION_TIME);
    }

    //  Convertir le temps restant en minutes:secondes
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleVerifyOtp)}>
                        <div className="mb-4 flex justify-center">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-center">
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field} autoFocus className="flex justify-center gap-2">
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
                                        </FormControl>
                                        <FormDescription>
                                            Votre code de vérification à 6 chiffres <span> expirera dans {minutes} min {seconds} sec</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                onClick={handleResendOtp}
                                disabled={resendCooldown > 0}
                            >
                                {resendCooldown > 0 ? `Réessayer dans ${resendCooldown}s` : "Renvoyer le code"}
                            </button>
                        </p>
                    </form>
                </Form>
            </div>
        </>
    )
}
