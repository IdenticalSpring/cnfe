import { colors } from './colors';
import { typography } from './typography';

export const theme = {
    colors,
    typography,
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '16px',
        xl: '50px'
    },
    zIndex: {
        low: 100,
        medium: 200,
        high: 300,
    },
    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
    },
};
