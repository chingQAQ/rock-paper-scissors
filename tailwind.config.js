const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: '320px',
            md: '600px',
        },
        extend: {
            colors: {
                'neutral-dark': 'hsl(229, 25%, 31%)',
                'neutral-score': 'hsl(229, 64%, 46%)',
                'header-outline': 'hsl(217, 16%, 45%)'
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem'
            }
        }
    },
    plugins: [
        plugin(({ addComponents }) => {
            addComponents({
                '.container': {
                    '@screen sm': {
                        maxWidth: '100%'
                    },
                    '@screen md': {
                        maxWidth: '1000px'
                    }
                }
            });
        })
    ]
};