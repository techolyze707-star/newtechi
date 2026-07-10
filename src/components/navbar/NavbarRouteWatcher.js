'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Invisible component that unchecks the mobile-menu checkbox whenever
 * the route changes, closing the drawer without requiring the full
 * Navbar to be a client component.
 */
export default function NavbarRouteWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const toggle = document.getElementById('mobile-menu-toggle');
    if (toggle) toggle.checked = false;
  }, [pathname]);

  return null;
}
