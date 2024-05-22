import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/socket.io': {
        target: 'ws://192.168.1.5:3000',
        ws: true,
      },
    }
  }
})
