import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    // CRITICAL: Disable browser's scroll restoration
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    // useLayoutEffect runs BEFORE browser paints - most aggressive approach
    useLayoutEffect(() => {
        // NUCLEAR OPTION: Force scroll to top before ANY rendering
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Destroy Lenis immediately if it exists
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true, force: true });
        }
    }, [pathname]);

    useEffect(() => {
        // SECONDARY LAYER: Multiple fallbacks after render

        // 1. Immediate
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // 2. RAF
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });

        // 3. Double RAF
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            });
        });

        // 4. Immediate timeout
        const timer1 = setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
        }, 0);

        // 5. Delayed timeout (catches late initialization)
        const timer2 = setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
        }, 50);

        // 6. Very delayed timeout (nuclear option for stubborn cases)
        const timer3 = setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
        }, 100);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [pathname]);

    return null;
}
