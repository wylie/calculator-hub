import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://simplecalculators.io',
  base: '/',
  integrations: [
    react(),
    tailwind({
      // Disable the default base styles since we have our own in index.css
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    ssr: {
      // Avoid issues with dependencies during SSR
      noExternal: ['react-router-dom'],
    },
  },
});
