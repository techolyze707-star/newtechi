import { NextResponse } from 'next/server';
import { generateCSPHeader } from '@/lib/csp';

/**
 * Middleware for handling trailing slashes and SEO redirects
 * Ensures consistent URL structure across the site
 */
export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Don't modify API routes, static files, or Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') // Files with extensions (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // ── Admin route protection ───────────────────────────────────────────────
  // Guard every /admin/* page except /admin/login itself.
  // The cookie `admin_session` is set by setAdminSession() in auth.js on login
  // and cleared by clearAdminSession() on logout — giving us true server-side
  // protection that client-side localStorage checks cannot provide.
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session');
    if (!sessionCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      // Pass the original destination so we can redirect back after login
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Remove trailing slash (except for root path)
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301); // Permanent redirect
  }

  // Add security headers
  // Content Security Policy - protects against XSS attacks
  const isDevelopment = process.env.NODE_ENV === 'development';
  const cspHeader = generateCSPHeader(isDevelopment);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', cspHeader);

  // Additional security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // SEO headers
  response.headers.set('X-Robots-Tag', 'index, follow');

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
