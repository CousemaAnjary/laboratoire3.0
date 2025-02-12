import Link from 'next/link'
import { Button } from './ui/button'
import ThemeSwitcher from './theme-switcher'
import { Contact, House, Info, LayoutTemplate, LogIn, User } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "./ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"


export default function Navbar() {
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
        <nav className="relative z-10 mx-auto mt-4 flex h-14 w-full max-w-5xl items-center justify-between rounded-full border bg-white dark:bg-zinc-950">

        {/* Logo et Menu */}
        <div className="ms-5 flex items-center">
            <LayoutTemplate />
            <ul className='ms-2 flex space-x-1'>
                <li>
                    <Link href="/">
                        <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                            <House className="size-3" />
                            <span>Accueil</span>
                        </Button>

                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                            <Info className="size-3" />
                            <span>A propos de moi</span>
                        </Button>

                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                            <Contact className="size-3" />
                            <span>Contact</span>
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>

        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size={'icon'}
                        variant={'secondary'}
                        className="mr-5 rounded-full border text-gray-600 dark:border-gray-600 dark:text-gray-200"
                    >
                        <User />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-2 w-72">
                    <DropdownMenuGroup className='space-y-3 p-2'>
                        {/* Theme Section */}
                        <div className="flex items-center justify-between">
                            <span className='font-spaceGrotesk text-sm'>Thème</span>
                            <ThemeSwitcher />
                        </div>

                        {/* Language Section */}
                        <div className="flex items-center justify-between">
                            <span className='font-spaceGrotesk text-sm'>Langue</span>
                            <Select defaultValue="fr">
                                <SelectTrigger className="h-7 w-[130px] font-spaceGrotesk">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className='font-spaceGrotesk'>
                                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                                        <SelectItem value="en">🇬🇧 English</SelectItem>
                                        <SelectItem value="es">🇲🇬 Malagasy</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Login Section */}
                    <Link href="/auth/login">
                        <DropdownMenuItem className="font-spaceGrotesk font-medium">
                            <div className="flex items-center space-x-2">
                                <LogIn className="size-4" />
                                <span>Se connecter</span>
                            </div>
                            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    </nav>
    )
}