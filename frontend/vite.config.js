import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// Get the API URL from the environment variable
const apiUrl = process.env.VITE_REACT_API_URL || 'http://127.0.0.1:5000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/API'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/API/, ''),
      },
    },
  },
})
