import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',          // keep project root
  publicDir: 'public', // correct location for static assets
  base: '/',           // good for Vercel / Netlify
});
