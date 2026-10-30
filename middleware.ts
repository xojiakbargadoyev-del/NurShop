import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    const token = (request as any).nextauth?.token;
    const path = request.nextUrl.pathname;

    if (path === "/admin/login") {
      return NextResponse.next();
    }

    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path === "/admin/login") {
          return true;
        }
        return !!token && token.role === "ADMIN";
      }
    }
  }
);

export const config = {
  matcher: ["/admin/:path*"]
};
