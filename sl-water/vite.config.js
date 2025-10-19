import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import devtools from 'vite-plugin-vue-devtools'

export default defineConfig({
    server: {
        host: true,
        allowedHosts: ['frontend.vm1.test']
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url))
        }
    },
    plugins:[
        tailwindcss(),
        vue(),
        devtools()
    ]
})