import { prisma } from "@/src/lib/prisma"

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        return user

    } catch (error) {
        console.error(error, "Error in getUserByEmail")
        return null 
    }
}