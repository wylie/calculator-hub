import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://simplecalculators.io',
  base: '/',
  redirects: {
    '/budgeting': '/money',
    '/budgeting-finance': '/money',
    '/budgeting-and-finance': '/money',
    '/finance': '/money',
    '/personal-finance': '/money',
    '/money-calculators': '/money',
    '/savings-investment': '/money',
    '/savings-and-investment': '/money',
    '/savings-investment-calculators': '/money',
    '/loans-and-real-estate': '/loans',
    '/loans-real-estate': '/loans',
    '/loan-calculators': '/loans',
    '/real-estate-calculators': '/loans',
    '/health-and-lifestyle': '/health',
    '/health-lifestyle': '/health',
    '/health-and-fitness': '/health',
    '/health-fitness': '/health',
    '/fitness-calculators': '/health',
    '/converters-and-tools': '/converters',
    '/converters-tools': '/converters',
    '/conversion-tools': '/converters',
    '/conversion-calculators': '/converters',
    '/tools-and-planning': '/tools-planning',
    '/planning-tools': '/tools-planning',
  },
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
