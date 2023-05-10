import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'app',
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'app', 'index.html'),
        mock: resolve(__dirname, 'app', 'mock/index.html'),
      },
    },
  },
});