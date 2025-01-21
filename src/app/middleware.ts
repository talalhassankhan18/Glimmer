import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// Define protected and public routes
const protectedRoutes = ["/salons", "/vendor"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Check the session cookie
  const cookie = (await cookies()).get("session")?.value;

  console.log("Middleware Debug - Path:", path);
  console.log("Middleware Debug - Session Cookie:", cookie);

  let session = null;
  try {
    if (cookie) {
      session = await decrypt(cookie);
      console.log("Middleware Debug - Decrypted Session:", session);
    }
  } catch (error) {
    console.error("Error decrypting session:", error);
  }

  // If accessing a protected route and no valid session exists, redirect to login
  if (isProtectedRoute && !session?.userId) {
    console.log("Unauthorized access to", path, ". Redirecting to /login.");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If accessing a public route while logged in, redirect to salons page
  if (isPublicRoute && session?.userId) {
    console.log("Already authenticated. Redirecting to /salons.");
    return NextResponse.redirect(new URL("/salons", req.nextUrl));
  }

  return NextResponse.next();
}

// Specify routes the middleware should apply to
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(png|jpg|ico|svg)$).*)", // Apply to all except static files
    "/login",
    "/signup",
    "/salons",
    "/vendor",
  ],
};
