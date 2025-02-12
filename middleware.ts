import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import authConfig from "./src/lib/auth.config"


const { auth } = NextAuth(authConfig)

// ✅ Définition des routes protégées et publiques
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']
const DEFAULT_LOGIN_REDIRECT = "/dashboard"

export default auth(async function middleware(req) {
    const { nextUrl } = req
    const isLogged = !!req.auth // ✅ Vérifie si l'utilisateur est connecté

    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    // 🔹 Redirection : Si l'utilisateur **n'est pas connecté** et essaie d'accéder à une **page protégée**
    if (!isLogged && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", req.url))

    }

    // 🔹 Redirection : Si l'utilisateur **est connecté** et tente d'accéder à une **page publique**
    if (isLogged && isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
    }

    return NextResponse.next()
})

// ✅ Configuration de la redirection 
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}