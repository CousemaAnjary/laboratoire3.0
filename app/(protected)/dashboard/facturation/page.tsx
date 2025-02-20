"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { FacturationSchema } from "@/src/lib/schemas/facturation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/src/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"


export default function Facturation() {
    /**
     * ! STATE (état, données) de l'application
     */
    const form = useForm({
        resolver: zodResolver(FacturationSchema),
        defaultValues: {
            name: "",
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleSubmit = () => {
        console.log('submit')
    }


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="mb-8 flex w-full items-center justify-between rounded-md bg-white p-4 shadow-sm">
                <h1 className="font-spaceGrotesk font-medium text-gray-800">Mes factures en cours</h1>
            </div>

            <div className="grid cursor-pointer gap-4 md:grid-cols-3">
                <Dialog>
                    <DialogTrigger asChild>
                        <Card className="w-[350px] rounded-sm  border-dashed border-slate-300 bg-transparent shadow-sm">
                            <CardHeader>
                                <CardTitle className="font-inter font-medium">Créer une facture</CardTitle>
                                <CardDescription className="font-spaceGrotesk">Créer une nouvelle facture pour un client</CardDescription>
                            </CardHeader>
                        </Card>
                    </DialogTrigger>

                    {/* Dialog (popup) pour créer une facture */}
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="font-inter font-medium">Créer une nouvelle facture</DialogTitle>
                            <DialogDescription className="font-spaceGrotesk">
                                Émettez une facture claire et détaillée pour votre client
                            </DialogDescription>
                        </DialogHeader>

                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Titre de la facture</FormLabel>
                                                <FormControl>
                                                    <Input {...field}
                                                        type="text"
                                                        placeholder="Nom de la facture (max 60 caractères)"
                                                        autoFocus
                                                        className="mb-4"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="my-4">
                                        <Button type='submit' size={"sm"} className="col-span-2 w-full rounded-sm">
                                            Créer la facture
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}