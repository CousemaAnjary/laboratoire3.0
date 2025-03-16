"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { authClient } from "@/src/lib/auth-client"
import { LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"


export default function UserDropdownMenu() {
    /**
     * ! STATE (état, données) de l'application
     */
    const router = useRouter()
    const {data: session} = authClient.useSession()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login")
                },
            },
        })
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="relative size-8 rounded"
                >
                    <Avatar className="size-8 rounded">
                        <AvatarImage
                            src={session?.user?.image ?? undefined}
                            alt="@shadcn" />
                        <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="mb-1 font-inter text-sm font-medium leading-none">{session?.user?.name}</p>
                        <p className="font-inter text-xs leading-none text-muted-foreground">
                            {session?.user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="#" className="flex items-center font-inter">
                            <User className="mr-3 size-4 text-muted-foreground" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="#" className="flex items-center font-inter">
                            <Settings className="mr-3 size-4 text-muted-foreground" />
                            Paramètres
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-inter hover:cursor-pointer" onClick={() => signOut()}>
                    <LogOut className="mr-3 size-4 text-red-600" />
                    Déconnexion
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}