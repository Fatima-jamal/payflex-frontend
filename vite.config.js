import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 👇 This fixes 404s when refreshing routes like /confirmation
  base: '/',
  optimizeDeps: {},
  assetsInclude: [],
  define: {},
  css: {},
  esbuild: {},
  json: {},
  // 👇 This line is critical:
  server: {
    historyApiFallback: true
  }
});
