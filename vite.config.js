import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `${name}/style`,
        }),
    ],  
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@api': path.resolve(__dirname, './src/api'),
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@classes': path.resolve(__dirname, './src/classes'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@plugins': path.resolve(__dirname, './src/plugins')
        }
      },
    server: {
        host: '127.0.0.1',
        // home
        // host: '192.168.0.121' ,
        // OCM
        // host: '172.29.0.120' ,
        port: 3001
    }
})