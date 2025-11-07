import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookies } from "./middleware/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt")?.value;
  const role: string = await getCookies("role");

  // ✅ allow public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // ❌ no token -> redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ ตรวจสอบว่า token หมดอายุหรือยัง
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    const currentTime = Math.floor(Date.now() / 1000); // วินาที
    if (payload.exp && payload.exp < currentTime) {
      console.log("JWT expired");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("jwt"); // ลบ token ที่หมดอายุ
      response.cookies.delete("role");
      return response;
    }
  } catch (error) {
    console.error("Invalid JWT:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Role-based routing
  if (role === "[ROLE_ADMIN]" && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (role === "[ROLE_USER]" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
