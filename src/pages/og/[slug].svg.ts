import type { APIRoute, GetStaticPaths } from 'astro';

const titles: Record<string, string> = {
  home: 'Simple Calculators',
  mortgage: 'Mortgage Calculator',
  budget: 'Budget Calculator',
  weather: 'Weather Converter',
  calories: 'Calorie Calculator',
  'bike-gear': 'Bike Gear Calculator',
  'auto-loan': 'Auto Loan Calculator',
  refinance: 'Refinance Calculator',
  'down-payment': 'Down Payment Calculator',
  interest: 'Interest Calculator',
  'compound-interest': 'Compound Interest Calculator',
  'investment-growth': 'Investment Growth Calculator',
  retirement: 'Retirement Calculator',
  'credit-card-payoff': 'Credit Card Payoff Calculator',
  'net-worth': 'Net Worth Calculator',
  weight: 'Weight Converter',
  length: 'Length Converter',
  speed: 'Speed Converter',
  volume: 'Volume Converter',
  area: 'Area Converter',
  time: 'Time Converter',
  'file-size': 'File Size Converter',
  percentage: 'Percentage Converter',
  'date-difference': 'Date Difference Calculator',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
  contact: 'Contact',
};

const slugs = Object.keys(titles);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const getStaticPaths: GetStaticPaths = async () => {
  return slugs.map((slug) => ({ params: { slug } }));
};

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug ?? 'home';
  const title = titles[slug] ?? 'Simple Calculators';
  const safeTitle = escapeXml(title);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${safeTitle}</title>
  <desc id="desc">Simple Calculators page preview</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="90" y="235" font-family="Inter, system-ui, sans-serif" font-size="36" fill="#93c5fd">Simple Calculators</text>
  <text x="90" y="320" font-family="Inter, system-ui, sans-serif" font-size="68" font-weight="700" fill="#ffffff">${safeTitle}</text>
  <text x="90" y="390" font-family="Inter, system-ui, sans-serif" font-size="30" fill="#cbd5e1">Fast • Accurate • Free</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
