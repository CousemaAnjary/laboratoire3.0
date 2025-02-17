"use client"

import Link from "next/link"
import { getMenu } from "@/src/utils/menu"
import { usePathname } from "next/navigation"
import { ChevronRight, Ellipsis } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "../ui/sidebar"


export default function SidebarContentMenu() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { open } = useSidebar()
    const pathname = usePathname()
    const menuGroups = getMenu(pathname)

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            {menuGroups.map((group) => (
                <SidebarGroup key={group.groupLabel}>
                    {/* Étiquette du groupe */}
                    <SidebarGroupLabel>
                        {open ? group.groupLabel : <Ellipsis className="mt-3 size-5 cursor-pointer" />}
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {group.menus.map((menu) => (
                                <Collapsible key={menu.href} defaultOpen={menu.active} className="group/collapsible" asChild>
                                    {/* Élément du menu */}
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <Link href={menu.href} passHref>
                                                <SidebarMenuButton asChild variant={menu.active ? "outline" : "default"} tooltip={menu.label}>
                                                    <span className="flex items-center gap-2">
                                                        {menu.icon && <menu.icon className="text-black" />}
                                                        <span className="font-inter">{menu.label}</span>
                                                        {menu.submenus && menu.submenus.length > 0 && (
                                                            <ChevronRight size={15} className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                        )}
                                                    </span>

                                                </SidebarMenuButton>
                                            </Link>
                                        </CollapsibleTrigger>

                                        {/* Sous-menu */}
                                        {menu.submenus && menu.submenus.length > 0 && (
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {menu.submenus.map((submenu) => (
                                                        <SidebarMenuSubItem key={submenu.href}>
                                                            <Link href={submenu.href} passHref>
                                                                <SidebarMenuSubButton asChild isActive={submenu.active} >
                                                                    <span className={`font-spaceGrotesk text-xs font-medium ${submenu.active ? "text-blue-900 hover:text-blue-900" : ""}`}>
                                                                        {submenu.label}
                                                                    </span>
                                                                </SidebarMenuSubButton>
                                                            </Link>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </>
    );
}
