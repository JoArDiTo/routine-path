import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    }
  }
})
