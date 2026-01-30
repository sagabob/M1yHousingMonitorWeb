import { useMemo } from 'react';

/**
 * Hook to retrieve chart theme colors from CSS variables.
 * Fallbacks to default values if variables are not found.
 */
export const useChartTheme = () => {
    return useMemo(() => {
        const getVar = (name: string) =>
            typeof window !== 'undefined' ? getComputedStyle(document.body).getPropertyValue(name).trim() : '';

        return {
            primary: getVar('--primary') || '#7513b8',
            muted: getVar('--muted-foreground') || '#8c94a3',
            chart1: '#ba89dc'
        };
    }, []);
};
