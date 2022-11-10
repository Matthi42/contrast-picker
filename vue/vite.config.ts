import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        assetFileNames: '[name][extname]'
      }
    }
  }
})
