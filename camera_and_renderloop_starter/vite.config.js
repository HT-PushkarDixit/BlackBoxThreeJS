import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',                
  publicDir: 'public',       
  base: '/',                 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        transform: resolve(__dirname, 'src/Controls/TransformControls.html'),
        firstPerson: resolve(__dirname, 'src/Controls/FirstPersonControls.html'),
      },
    },
  },
})
