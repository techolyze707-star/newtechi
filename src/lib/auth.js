/**
 * Admin Authentication Utilities
 * Simple authentication for admin routes
 */

// Admin credentials (in production, use environment variables)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

export function validateAdminCredentials(username, password) {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

// Cookie name used by middleware for server-side guard
const SESSION_COOKIE = 'admin_session';
// 24 hours in seconds
const MAX_AGE_SECONDS = 24 * 60 * 60;

export function setAdminSession() {
  if (typeof window !== 'undefined') {
    // LocalStorage (legacy, client-side checks)
    localStorage.setItem('adminSession', 'true');
    localStorage.setItem('adminTimestamp', Date.now().toString());

    // Cookie — readable by the Edge middleware for true server-side protection.
    // SameSite=Strict prevents CSRF.  Not HttpOnly so JS can clear it on logout.
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${SESSION_COOKIE}=1; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Strict${secure}`;
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminTimestamp');

    // Expire the cookie immediately
    document.cookie = `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Strict`;
  }
}

export function isAdminAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const session = localStorage.getItem('adminSession');
  const timestamp = localStorage.getItem('adminTimestamp');
  
  if (!session || !timestamp) return false;
  
  // Check if session is older than 24 hours
  const sessionAge = Date.now() - parseInt(timestamp);
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  if (sessionAge > maxAge) {
    clearAdminSession();
    return false;
  }
  
  return session === 'true';
}

export function requireAdminAuth() {
  if (!isAdminAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return false;
  }
  return true;
}