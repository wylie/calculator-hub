import sharp from 'sharp';

const width = 1200;
const height = 630;

// Create SVG
const svg = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#f8fafc;stop-opacity:1"/>
    </linearGradient>
  </defs>
  
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <rect x="0" y="0" width="400" height="8" fill="#3b82f6"/>
  
  <text x="600" y="140" font-family="Arial, sans-serif" font-size="88" font-weight="800" text-anchor="middle" fill="#0f172a">
    Calculator Hub
  </text>
  
  <text x="600" y="210" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" fill="#475569" font-weight="500">
    Free Tools for Your Calculations
  </text>
  
  <rect x="100" y="300" width="80" height="80" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="140" y="355" font-size="48" text-anchor="middle">🏠</text>
  <text x="140" y="420" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#1e293b" font-weight="600">Mortgage</text>
  
  <rect x="320" y="300" width="80" height="80" rx="12" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <text x="360" y="355" font-size="48" text-anchor="middle">💰</text>
  <text x="360" y="420" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#1e293b" font-weight="600">Budget</text>
  
  <rect x="540" y="300" width="80" height="80" rx="12" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
  <text x="580" y="355" font-size="48" text-anchor="middle">📈</text>
  <text x="580" y="425" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#1e293b" font-weight="600">Interest</text>
  
  <rect x="760" y="300" width="80" height="80" rx="12" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
  <text x="800" y="355" font-size="48" text-anchor="middle">🔥</text>
  <text x="800" y="420" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#1e293b" font-weight="600">Calories</text>
  
  <rect x="980" y="300" width="80" height="80" rx="12" fill="#e9d5ff" stroke="#a855f7" stroke-width="2"/>
  <text x="1020" y="355" font-size="48" text-anchor="middle">🚴</text>
  <text x="1020" y="420" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#1e293b" font-weight="600">Cycling</text>
  
  <text x="600" y="580" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#64748b" font-weight="500">
    50+ calculators for finance, health, conversions and more
  </text>
  
  <rect x="800" y="625" width="400" height="5" fill="#3b82f6"/>
</svg>
`);

// Generate PNG
await sharp(svg)
  .png({ quality: 95 })
  .toFile('public/og-image.png');

console.log('✓ OG image generated: public/og-image.png');
