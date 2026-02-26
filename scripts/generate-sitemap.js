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

const newCalculatorRoutes = [
  '/hourly-to-salary',
  '/overtime-pay',
  '/take-home-pay',
  '/after-tax-salary',
  '/pay-raise',
  '/annual-income',
  '/biweekly-pay',
  '/monthly-income',
  '/self-employment-tax',
  '/1099-vs-w2',
  '/personal-loan',
  '/student-loan',
  '/debt-snowball',
  '/debt-avalanche',
  '/heloc',
  '/amortization-calculator',
  '/loan-payment-calculator',
  '/percentage-of-a-number',
  '/what-percent-of-x-is-y',
  '/fraction-to-percent',
  '/percent-to-fraction',
  '/margin-calculator',
  '/markup-calculator',
  '/body-fat',
  '/lean-body-mass',
  '/macro-calculator',
  '/calories-burned',
  '/one-rep-max',
  '/target-heart-rate',
  '/property-tax',
  '/closing-cost',
  '/pmi',
  '/home-equity',
  '/rent-increase',
  '/rental-yield',
  '/work-hours',
  '/business-days',
  '/countdown',
  '/week-number',
  '/time-zone-converter',
  '/climbing-grade-converter',
  '/trail-elevation-gain',
  '/pace-per-mile',
  '/cycling-ftp',
  '/vo2-max',
  '/paycheck-calculator',
  '/gross-to-net-calculator',
  '/net-to-gross-calculator',
  '/weekly-pay-calculator',
  '/daily-pay-calculator',
  '/semi-monthly-pay-calculator',
  '/commission-calculator',
  '/bonus-tax-calculator',
  '/severance-pay-calculator',
  '/salary-percentage-increase-calculator',
  '/cost-of-living-adjustment-calculator',
  '/freelance-rate-calculator',
  '/house-affordability-calculator',
  '/adjustable-rate-mortgage-calculator',
  '/refinance-break-even-calculator',
  '/mortgage-extra-payment-calculator',
  '/mortgage-early-payoff-calculator',
  '/loan-term-calculator',
  '/simple-interest-calculator',
  '/compound-daily-interest-calculator',
  '/compound-monthly-interest-calculator',
  '/debt-consolidation-calculator',
  '/balance-transfer-calculator',
  '/credit-utilization-calculator',
  '/home-appreciation-calculator',
  '/rental-cash-flow-calculator',
  '/rent-vs-invest-calculator',
  '/property-value-estimator',
  '/closing-cost-percentage-calculator',
  '/break-even-calculator',
  '/profit-margin-calculator',
  '/cash-flow-calculator',
  '/sales-tax-calculator',
  '/depreciation-calculator',
  '/inflation-adjusted-return-calculator',
  '/age-in-days-calculator',
  '/age-in-months-calculator',
  '/days-until-calculator',
  '/months-between-dates-calculator',
  '/hours-to-days-calculator',
  '/square-footage-calculator',
  '/cubic-feet-calculator',
  '/percent-error-calculator',
  '/percent-difference-calculator',
  '/margin-vs-markup-calculator',
  '/calorie-deficit-calculator',
  '/pregnancy-due-date-calculator',
  '/resting-metabolic-rate-calculator',
  '/net-pay-calculator',
  '/gross-pay-calculator',
  '/take-home-pay-after-401k-calculator',
  '/401k-contribution-calculator',
  '/401k-match-calculator',
  '/roth-vs-traditional-ira-calculator',
  '/ira-contribution-calculator',
  '/required-minimum-distribution-calculator',
  '/future-value-calculator',
  '/present-value-calculator',
  '/rule-of-72-calculator',
  '/cd-calculator',
  '/annuity-calculator',
  '/capital-gains-tax-calculator',
  '/dividend-yield-calculator',
  '/stock-average-cost-calculator',
  '/stock-return-calculator',
  '/portfolio-return-calculator',
  '/real-rate-of-return-calculator',
  '/debt-payoff-calculator',
  '/mortgage-interest-calculator',
  '/loan-interest-calculator',
  '/car-affordability-calculator',
  '/home-affordability-calculator',
  '/rent-affordability-calculator',
  '/budget-percentage-calculator',
  '/expense-ratio-calculator',
  '/compound-annual-growth-rate-calculator',
  '/profit-calculator',
  '/unit-price-calculator',
  '/markup-percentage-calculator',
  '/sales-commission-calculator',
  '/business-loan-calculator',
  '/small-business-profit-calculator',
  '/workdays-between-dates-calculator',
  '/time-card-calculator',
  '/hours-worked-calculator',
  '/sleep-calculator',
  '/bmr-calculator',
  '/heart-rate-zone-calculator',
  '/steps-to-miles-calculator',
  '/pace-converter',
  '/running-calories-burned-calculator',
  '/fuel-cost-calculator',
  '/gas-mileage-calculator',
  '/cooking-time-converter',
  '/temperature-feels-like-calculator',
  '/voltage-converter',
  '/density-calculator',
  '/pressure-converter',
];

for (const path of newCalculatorRoutes) {
  routes.push({ path, priority: 0.75, changefreq: 'monthly' });
}

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
