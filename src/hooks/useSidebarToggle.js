'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to manage sidebar collapse state
 * Desktop (lg+): Sidebar open by default (isCollapsed = false)
 * Mobile (below lg): Sidebar closed by default (isCollapsed = true)
 */
export function useSidebarToggle() {
    const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed for SSR
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Check if screen is desktop (lg breakpoint = 1024px)
        const checkScreenSize = () => {
            const isDesktop = window.innerWidth >= 1024;
            setIsCollapsed(!isDesktop); // false for desktop (open), true for mobile (closed)
        };

        // Set initial state
        checkScreenSize();

        // Listen for resize events
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return {
        isCollapsed,
        setIsCollapsed,
        isMounted
    };
}
