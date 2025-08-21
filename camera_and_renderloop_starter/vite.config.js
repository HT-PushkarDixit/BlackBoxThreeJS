import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',                 
  publicDir: 'public',       
  base: '/',                 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        transform: resolve(__dirname, 'Controls/TransformControls.html'),
        firstPerson: resolve(__dirname, 'Controls/FirstPersonControls.html'),
      },
    },
  },
});
