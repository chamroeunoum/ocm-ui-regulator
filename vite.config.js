import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';

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
    server: {
        host: '127.0.0.1',
        // home
        // host: '192.168.0.121' ,
        // OCM
        // host: '172.29.0.120' ,
        port: 7002
    }
})