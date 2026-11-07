import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// `npm run dev` kjører nettsiden med hot reload. Start serveren ved siden av (`npm run server`).
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://127.0.0.1:4545' } },
  build: { outDir: 'dist' },
});
