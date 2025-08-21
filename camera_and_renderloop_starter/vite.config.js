import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',                 // project root
  publicDir: 'public',        // static assets (copied as-is)
  base: '/',                  // ensures correct paths on Vercel/Netlify
  build: {
    rollupOptions: {
      input: {
        // main entry
        main: resolve(__dirname, 'index.html'),

        // extra pages (add more here as needed)
        transform: resolve(__dirname, 'Controls/TransformControls.html'),
        firstPerson: resolve(__dirname, 'Controls/FirstPersonControls.html'),
        // example: anotherPage: resolve(__dirname, 'Controls/AnotherPage.html')
      },
    },
  },
});
