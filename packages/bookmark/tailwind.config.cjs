const path = require('path')
const config = require('../app/tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        path.resolve(__dirname, './src/**/*.vue'),
        path.resolve(__dirname, '../app/components/*.vue'),
    ],
    theme: config.theme,
    plugins: [],
}
