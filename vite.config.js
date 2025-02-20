import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~antd': path.resolve(__dirname, 'node_modules/ant-design-vue'),
    },
  },
  server: {
    port: 7088,
    proxy: {
      "/mfm-core-etime": {
        target: "http://192.168.3.xxx:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mfm-core-etime/, "mfm-core-etime"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,  // 启用 JavaScript
      },
    },
  },
})
