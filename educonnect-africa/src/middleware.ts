import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Admin routes - require admin role
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(new URL("/auth/signin?callbackUrl=/admin", req.url));
      }
    }

    // Counselor routes - require counselor role
    if (pathname.startsWith("/counselor")) {
      if (!token || token.role !== "counselor") {
        return NextResponse.redirect(new URL("/auth/signin?callbackUrl=/counselor", req.url));
      }
    }

    // Profile and booking routes - require any authenticated user
    if (pathname.startsWith("/profile") ||
        pathname.startsWith("/counseling/book") ||
        pathname.startsWith("/counseling/session") ||
        pathname.startsWith("/counseling/feedback")) {
      if (!token) {
        return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${pathname}`, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/auth/signin",
          "/auth/signup",
          "/universities",
          "/counseling",
          "/tools/calculator",
          "/questionnaire",
          "/resources",
          "/scholarships"
        ];

        // Allow access to public routes without authentication
        if (publicRoutes.includes(pathname) ||
            pathname.startsWith("/api/auth") ||
            pathname.startsWith("/_next") ||
            pathname.startsWith("/images") ||
            pathname.includes(".")) {
          return true;
        }

        // For protected routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|icons).*)",
  ],
};
