import React, { createContext, useContext, useState, useMemo } from 'react';

const PageContext = createContext(null);

export function PageProvider({ children, initialPage = 'home' }) {
    const [activePage, setActivePage] = useState(initialPage);
    const value = useMemo(() => ({ activePage, setActivePage }), [activePage]);
    return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

/**
 * usePage hook
 * Returns: { activePage, setActivePage }
 * - activePage: current page id/name used by the page container
 * - setActivePage: function to update the active page (used by navigation)
 */
export function usePage() {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    }
    return context;
}
