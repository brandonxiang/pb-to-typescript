import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'app',
  plugins: [
    svelte(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          injectHead:
            "<link rel='icon' type='image/png' href='/static/favicon.png'>",
        },
      },
    }),
  ],
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['protobufjs', 'clipboard'],
        },
      },
    },
  },
});
