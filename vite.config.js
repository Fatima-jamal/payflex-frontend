import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Required for external access (mobile or cloudflare)
    historyApiFallback: true,
    strictPort: true,
    hmr: {
      clientPort: 443 // For HTTPS tunneling (cloudflare)
    },
    allowedHosts: ['.trycloudflare.com'] // ✅ Enables external access via tunnel
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  base: '/',
  optimizeDeps: {},
  assetsInclude: [],
  define: {},
  css: {},
  esbuild: {},
  json: {}
});
