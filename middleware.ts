import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

// 🔹 Définition des routes protégées et publiques
const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login", "/register", "/"]


export async function middleware(request: NextRequest) {

    const url = new URL(request.url)

    const sessionCookie = getSessionCookie(request, {
        cookieName: "session_token",
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production", // Activer les cookies sécurisés en production
    })

    // Verification des routes protégées et publiques
    const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route))
    const isPublicRoute = publicRoutes.includes(url.pathname)

    // 🔹 Redirection si l'utilisateur **n'est pas connecté** et tente d'accéder à une **page protégée**
    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // 🔹 Redirection si l'utilisateur **est connecté** et tente d'accéder à une **page publique**
    if (isPublicRoute && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
}