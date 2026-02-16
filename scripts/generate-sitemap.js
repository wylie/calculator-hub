#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const DOMAIN = 'https://simplecalculators.io';
const TODAY = new Date().toISOString().split('T')[0];

// Define all routes with their priority and change frequency
const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/mortgage', priority: 0.9, changefreq: 'monthly' },
  { path: '/budget', priority: 0.9, changefreq: 'monthly' },
  { path: '/interest', priority: 0.9, changefreq: 'monthly' },
  { path: '/investment-growth', priority: 0.9, changefreq: 'monthly' },
  { path: '/retirement', priority: 0.9, changefreq: 'monthly' },
  { path: '/auto-loan', priority: 0.8, changefreq: 'monthly' },
  { path: '/compound-interest', priority: 0.8, changefreq: 'monthly' },
  { path: '/credit-card-payoff', priority: 0.8, changefreq: 'monthly' },
  { path: '/refinance', priority: 0.8, changefreq: 'monthly' },
  { path: '/down-payment', priority: 0.8, changefreq: 'monthly' },
  { path: '/net-worth', priority: 0.8, changefreq: 'monthly' },
  { path: '/weather', priority: 0.7, changefreq: 'monthly' },
  { path: '/calories', priority: 0.7, changefreq: 'monthly' },
  { path: '/bike-gear', priority: 0.7, changefreq: 'monthly' },
  { path: '/weight', priority: 0.7, changefreq: 'monthly' },
  { path: '/length', priority: 0.7, changefreq: 'monthly' },
  { path: '/speed', priority: 0.7, changefreq: 'monthly' },
  { path: '/volume', priority: 0.7, changefreq: 'monthly' },
  { path: '/area', priority: 0.7, changefreq: 'monthly' },
  { path: '/time', priority: 0.7, changefreq: 'monthly' },
  { path: '/file-size', priority: 0.7, changefreq: 'monthly' },
  { path: '/percentage', priority: 0.7, changefreq: 'monthly' },
  { path: '/date-difference', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms', priority: 0.5, changefreq: 'yearly' },
  { path: '/contact', priority: 0.6, changefreq: 'yearly' },
];

// Generate sitemap XML
function generateSitemap() {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>\n';

  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  return xmlHeader + urlsetOpen + urlEntries + '\n' + urlsetClose;
}

// Write sitemap
const sitemap = generateSitemap();
const outputPath = path.resolve(projectRoot, 'public', 'sitemap.xml');

try {
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  console.log(`✓ Sitemap generated at ${outputPath}`);
} catch (error) {
  console.error(`✗ Failed to generate sitemap:`, error.message);
  process.exit(1);
}
