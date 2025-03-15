"use client"

import Link from "next/link"
import { getMenu } from "@/src/utils/menu"
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"


export default function DynamicBreadcrumb() {

    const pathname = usePathname()
    const menuGroups = getMenu(pathname)

    // Trouver les menus actifs
    const activeMenu = menuGroups.flatMap((group) => group.menus).find((menu) => menu.active);
    const activeSubmenu = activeMenu?.submenus?.find((submenu) => submenu.active);

    // Vérifier si l'utilisateur est sur la page "Administration"
    if (pathname === "/dashboard") {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-spaceGrotesk text-xs font-medium text-gray-800">Administration</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        )
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Lien vers "Administration" (toujours affiché) */}
                <BreadcrumbItem>
                    <Link href="/dashboard" className="font-spaceGrotesk text-xs font-medium text-gray-600 hover:text-gray-800" >
                        Administration
                    </Link>
                </BreadcrumbItem>

                {activeMenu && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            {activeSubmenu ? (
                                <Link href={activeMenu.href} className="font-spaceGrotesk text-xs font-medium text-gray-600 hover:text-gray-800">
                                    {activeMenu.label}
                                </Link>

                            ) : (
                                <BreadcrumbPage className="font-spaceGrotesk text-xs font-medium text-gray-800">{activeMenu.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </>
                )}

                {activeSubmenu && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-spaceGrotesk text-xs font-medium text-gray-800">{activeSubmenu.label}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
