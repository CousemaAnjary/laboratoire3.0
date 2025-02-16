import { z } from "zod"
import { RegisterSchema } from "../lib/schemas/auth"


export const register = async (data: z.infer<typeof RegisterSchema>) => {

    const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    })

    return response.json() 
}