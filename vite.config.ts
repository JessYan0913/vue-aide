import { join } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: join(__dirname, './src') }],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
  },
});
