module.exports = {
    mode: 'jit',
    purge: [
        '../../**/*.phtml', // app/code
        '../../**/*.html', // app/code
        '../../../design/frontend/**/*.phtml', // app/design
        '../../../design/frontend/**/*.html', // app/design
    ],
    theme: {
        extend: {
            colors: {
            }
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
