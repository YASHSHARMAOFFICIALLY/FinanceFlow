import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/dashboard", "/tools", "/learn", "/Quiz", "/arthsathi"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Auth routes must NEVER be touched by middleware
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );

  if (!isProtected) return NextResponse.next();

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)" ],
};