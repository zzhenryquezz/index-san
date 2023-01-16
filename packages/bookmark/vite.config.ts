import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import components from 'unplugin-vue-components/vite'

const desktopPath = path.resolve(__dirname, '..', 'desktop')

console.log(path.resolve(desktopPath, 'i18n', 'en-US.json').replace(path.sep, '/'))

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, '..', 'core'),
            '@desktop': desktopPath,
        },
    },
    plugins: [
        vue() as any,
        components({
            dts: true,
            dirs: [path.resolve(desktopPath, 'components')],
        }),
        crx({ manifest }),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss({
                    config: path.resolve(desktopPath, 'tailwind.config.js'),
                }) as any,
            ],
        },
    },
})
