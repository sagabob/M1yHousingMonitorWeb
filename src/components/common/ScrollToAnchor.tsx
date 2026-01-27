import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToAnchor
 * 
 * Automatically scrolls the page to the element ID specified in the URL hash.
 * Handles cases where the target element is loaded asynchronously by retrying
 * for a set period of time.
 */
export const ScrollToAnchor = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;

        const targetId = location.hash.slice(1); // remove '#'
        if (!targetId) return;

        // Function to attempt scrolling
        const scrollToElement = () => {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return true;
            }
            return false;
        };

        // Attempt immediately
        if (scrollToElement()) return;

        // Retry logic for async content (e.g. 5 seconds max)
        const maxAttempts = 50;
        let attempts = 0;

        const intervalId = setInterval(() => {
            if (scrollToElement() || attempts >= maxAttempts) {
                clearInterval(intervalId);
            }
            attempts++;
        }, 100);

        // Cleanup interval on unmount or if hash changes
        return () => clearInterval(intervalId);
    }, [location.hash]); // tailored dependency

    return null;
};
