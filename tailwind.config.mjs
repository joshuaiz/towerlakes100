import { withUt } from 'uploadthing/tw'

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

// removes tailwind warning for deprecated colors.
delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']

export default withUt({
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        colors: {
            ...colors,
            transparent: 'transparent',
            primary: '#002A86',
            secondary: '#BC9C22',
            carribbean: '#216869',
            jungle: '#49A078',
            tea: '#C8D99F',
            straw: '#E0D569',
            sunset: '#F6CA83',
            'sandy-orange': '#EE964B',
            'chili-red': '#D64933',
            bark: '#99582A',
            'eerie-black': '#1F2421',
            'slate-green': '#324238',
            silver: '#A6A2A2',
            timberwolf: '#CFD2CD',
            'floral-white': '#FBFBF2',
            white: '#FFFFFF',
            black: '#000000',
        },
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    ...colors,
                    transparent: 'transparent',
                    primary: '#002A86',
                    secondary: '#BC9C22',
                    carribbean: '#216869',
                    jungle: '#49A078',
                    tea: '#C8D99F',
                    straw: '#E0D569',
                    sunset: '#F6CA83',
                    'sandy-orange': '#EE964B',
                    'chili-red': '#D64933',
                    bark: '#99582A',
                    'eerie-black': '#1F2421',
                    'slate-green': '#324238',
                    silver: '#A6A2A2',
                    timberwolf: '#CFD2CD',
                    'floral-white': '#FBFBF2',
                    white: '#FFFFFF',
                    black: '#000000',
                },
            },
        ],
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
})
