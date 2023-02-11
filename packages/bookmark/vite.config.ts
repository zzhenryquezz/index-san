import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        crx({ manifest }),
        AutoImport({
            dts: path.resolve(__dirname, 'auto-import.d.ts'),
            imports: ['vue'],
        }),
        Components({
            dts: path.resolve(__dirname, 'components.d.ts'),
            dirs: [path.resolve(__dirname, '..', 'app', 'components')],
        }),
    ],
})
