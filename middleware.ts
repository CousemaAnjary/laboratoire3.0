import { auth } from "./src/lib/auth";
import { NextResponse, NextRequest } from "next/server";

// ✅ Définition des routes protégées et publiques
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];
const DEFAULT_LOGIN_REDIRECT = "/dashboard";


export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const session = await auth() // ✅ Récupérer la session utilisateur

    const isLogged = !!session; // ✅ Vérifie si l'utilisateur est connecté
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    // 🔹 Redirection : Si l'utilisateur **n'est pas connecté** et essaie d'accéder à une **page protégée**
    if (!isLogged && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🔹 Redirection : Si l'utilisateur **est connecté** et tente d'accéder à une **page publique**
    if (isLogged && isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }

    return NextResponse.next();
}

// ✅ Middleware appliqué uniquement aux routes spécifiques
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}