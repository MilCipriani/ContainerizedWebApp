import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  //allows access from outside the container
    port: 5173,
    //strictPort: true, // <--ensures Vite doesn't pick a different port if 5173 is in use
  }
})
