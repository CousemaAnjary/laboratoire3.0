import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

// 🔹 Définition des routes protégées et publiques
const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login", "/register", "/"]
const restrictedForAuthenticated = ["/email-verified", "/reset-password"];


export async function middleware(request: NextRequest) {

    const url = new URL(request.url)

    const sessionCookie = getSessionCookie(request, {
        cookieName: "session_token",
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production", // Activer les cookies sécurisés en production
    })

    // Verification des routes protégées et publiques
    const isPublicRoute = publicRoutes.includes(url.pathname)
    const isRestrictedRoute = restrictedForAuthenticated.includes(url.pathname)
    const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route))



    // 🔹 Redirection si l'utilisateur **n'est pas connecté** et tente d'accéder à une **page protégée**
    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // 🔹 Redirection si l'utilisateur **est connecté** et tente d'accéder à une **page publique** et **page restreinte**
    if ((isPublicRoute || isRestrictedRoute) && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // 🔹 Vérification des accès aux pages sensibles (email verification & reset password)
    if (url.pathname === "/email-verified") {
        const email = request.cookies.get("emailToVerify")?.value

        if (!email) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (url.pathname === "/reset-password") {
        const token = url.searchParams.get("token")
        
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}