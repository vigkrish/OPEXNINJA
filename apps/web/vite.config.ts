import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/OPEXNINJA/',
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { port: 3000, open: true, strictPort: false },
  build: { outDir: 'dist', sourcemap: true, minify: 'esbuild', target: 'ES2020', chunkSizeWarningLimit: 1000 },
  preview: { port: 5000, open: true },
});
