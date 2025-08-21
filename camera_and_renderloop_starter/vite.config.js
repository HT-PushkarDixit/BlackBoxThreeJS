import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',           // keep your root as current folder
  publicDir: 'public', // where to put static files
  base: './',          // ✅ important for correct asset paths in subpages

  build: {
    rollupOptions: {
      input: {
        // index
        main: resolve(__dirname, 'index.html'),

        // controls pages
        orbit: resolve(__dirname, 'Controls/orbit.html'),
        arcball: resolve(__dirname, 'Controls/ArcballControls.html'),
        drag: resolve(__dirname, 'Controls/DragControls.html'),
        firstPerson: resolve(__dirname, 'Controls/FirstPersonControls.html'),
        fly: resolve(__dirname, 'Controls/FlyControls.html'),
        map: resolve(__dirname, 'Controls/MapControls.html'),
        pointer: resolve(__dirname, 'Controls/poiner.html'),
        trackball: resolve(__dirname, 'Controls/TrackballControls.html'),
        transform: resolve(__dirname, 'Controls/TransformControls.html'),
      },
    },
  },
})
