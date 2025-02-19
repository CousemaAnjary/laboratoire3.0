"use client"

import { getMenu } from "@/src/utils/menu"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb"

import { usePathname } from "next/navigation"

export default function DynamicBreadcrumb() {
    const pathname = usePathname();
    const menuGroups = getMenu(pathname);

    // Trouver les menus actifs
    const activeMenu = menuGroups.flatMap((group) => group.menus).find((menu) => menu.active);
    const activeSubmenu = activeMenu?.submenus?.find((submenu) => submenu.active);

    // Vérifier si l'utilisateur est sur la page "Administration"
    if (pathname === "/dashboard") {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-xs font-medium text-gray-800">Administration</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Lien vers "Administration" (toujours affiché) */}
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard" className="text-xs font-medium text-gray-600 hover:text-gray-800">
                        Administration
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {activeMenu && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            {activeSubmenu ? (
                              
                                    <BreadcrumbLink href={activeMenu.href} className="text-xs font-medium text-gray-600 hover:text-gray-800">
                                        {activeMenu.label}
                                    </BreadcrumbLink>
                              
                            ) : (
                                <BreadcrumbPage className="text-xs font-medium text-gray-800">{activeMenu.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </>
                )}

                {activeSubmenu && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-xs font-medium text-gray-800">{activeSubmenu.label}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
