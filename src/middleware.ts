import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * Protected Routes Configuration
 *
 * Routes that require user authentication to access.
 * These paths will redirect unauthenticated users to login.
 *
 * - /account: User profile and settings
 * - /diplomas: Main dashboard/diplomas page
 * - /questions: Exam questions and tests
 */
const protectedRoutes = ["/account", "/diplomas", "/questions"];

/**
 * Authentication Routes Configuration
 *
 * Routes that are part of the authentication flow.
 * Authenticated users accessing these routes will be redirected to the main app.
 * This prevents logged-in users from seeing login/register pages.
 *
 * - /login: User sign-in page
 * - /register: User registration page
 * - /forgot-password: Password reset flow
 */
const authRoutes = ["/login", "/register", "/forgot-password"];

//Utility function for login redirection
const redirectToLogin = (req: NextRequest) => {
  const url = new URL("/login", req.nextUrl.origin);
  return NextResponse.redirect(url);
};

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  //  If user enters "/" → redirect depending on authentication state
  if (path === "/") {
    if (!token) {
      return redirectToLogin(req);
    }
    const url = new URL("/diplomas", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  //  If user enters login/register while authenticated → redirect to /diplomas
  if (authRoutes.includes(path) && token) {
    const url = new URL("/diplomas", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  //  If user enters protectedRoutes without a token → redirect to login
  if (protectedRoutes.some((route) => path.startsWith(route)) && !token) {
    return redirectToLogin(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
