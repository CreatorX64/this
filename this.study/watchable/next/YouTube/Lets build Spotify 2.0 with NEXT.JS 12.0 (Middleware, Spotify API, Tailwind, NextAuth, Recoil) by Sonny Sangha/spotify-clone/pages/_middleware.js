import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  if (token && pathname === "/login") {
    // Redirect to homepage if there's a token AND the path is login
    return NextResponse.redirect("/");
  }

  if (token || pathname.includes("/api/auth")) {
    // Allow the request if the token exists OR if it's a request for next-auth
    // session & provider fetching
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    // Redirect to login if they don't have token AND are requesting a
    // protected route
    return NextResponse.redirect("/login");
  }
}
