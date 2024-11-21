import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
        output: {
            assetFileNames: 'assets/zipper_wizard[extname]',
            entryFileNames: 'assets/zipper_wizard.js',
        }
    }
}
})
