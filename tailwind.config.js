const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    experimental: {
        applyComplexClasses: true,
    },
    purge: [],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans],
                display: ['Google Sans', 'Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                lightGray: 'rgba(136,136,136,0.25)'
            }
        },
    },
    variants: {},
    plugins: [],
}
