import { Group } from "../typeScript/menu"
import { menuItems } from "./menuConfig"


/**
 * Génère dynamiquement le menu avec l'état actif basé sur l'URL actuelle.
 * @param pathname URL actuelle
 * @returns Liste des groupes de menu avec `active: boolean`
 */
export function getMenu(pathname: string): Group[] {
    return menuItems.map((group) => ({
        ...group,

        menus: group.menus.map((menu) => ({
            ...menu,

            active: pathname === menu.href || pathname.startsWith(menu.href), //  Détecte si actif
            submenus: menu.submenus
                ? menu.submenus.map((submenu) => ({
                    ...submenu,
                    active: pathname === submenu.href || pathname.startsWith(submenu.href),
                }))
                : [],
        })),
    }));
}
