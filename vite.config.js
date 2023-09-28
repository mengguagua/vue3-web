import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
})
