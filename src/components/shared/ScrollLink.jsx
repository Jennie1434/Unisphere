import { Link as RouterLink } from 'react-router-dom';

/**
 * Custom Link component that FORCES scroll to top on navigation
 * Use this instead of regular Link from react-router-dom
 */
export default function ScrollLink({ children, to, ...props }) {
    const handleClick = (e) => {
        // Force scroll to top IMMEDIATELY on click
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Destroy Lenis if it exists
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true, force: true });
        }

        // After navigation (next tick)
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
        }, 0);

        // Delayed backup
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 50);

        // Very delayed backup
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);

        // Call original onClick if provided
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <RouterLink to={to} {...props} onClick={handleClick}>
            {children}
        </RouterLink>
    );
}
