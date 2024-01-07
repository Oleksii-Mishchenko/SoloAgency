import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/SoloAgency/',
  server: {
    host: '0.0.0.0',
    port: 3000, // Додайте це поле з необхідним вам портом
  },
  plugins: [react()],
});