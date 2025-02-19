import { auth } from "./src/lib/auth"
import { NextResponse, NextRequest } from "next/server"

// 🔹 Définition des routes protégées et publiques
const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login", "/signup", "/"]
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req
    const session = await auth() // ✅ Récupérer la session utilisateur

    const isLogged = !!session
    
    // ✅ Vérification des routes protégées avec `.startsWith()`
    const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route))

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    // 🔹 Redirection si l'utilisateur **n'est pas connecté** et tente d'accéder à une **page protégée**
    if (!isLogged && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    // 🔹 Redirection si l'utilisateur **est connecté** et tente d'accéder à une **page publique**
    if (isLogged && isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return NextResponse.next()
}

// ✅ Middleware appliqué uniquement aux pages Next.js (exclut les fichiers statiques et API)
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
