"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/src/components/ui/input-otp"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/src/components/ui/form"
import { authClient } from "@/src/lib/auth-client"
import { useRouter } from "next/navigation"


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

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleVerifyOtp = async (data: z.infer<typeof FormSchema>) => {

        // ✅ Vérifier le code OTP
        try {
            const response = await authClient.emailOtp.verifyEmail({
                email: "user-email@email.com",
                otp: data.pin,

            })
            if (response.error) {
                toast.error(response.error.message)
                return
            }

            toast.success("Votre adresse email a été vérifiée avec succès.")
            router.push("/dashboard")

        } catch (error) {
            console.error("Erreur lors de la vérification de l'adresse email :", error)
        }
    }

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
                                            Votre code de vérification à 6 chiffres <span> expirera dans 2000 secondes.</span>
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
                                onClick={() => toast.info("Un nouveau code a été envoyé.")}
                            >
                                Renvoyer le code
                            </button>
                        </p>
                    </form>
                </Form>
            </div>
        </>
    )
}
