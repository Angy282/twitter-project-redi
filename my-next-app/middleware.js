import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken");

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/tweets/create");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tweets/create"],
};
