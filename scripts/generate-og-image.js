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
  
  <text x="600" y="140" font-family="Arial, sans-serif" font-size="88" font-weight="800" text-anchor="middle" fill="#0f172a">
    Calculator Hub
  </text>
  
  <text x="600" y="210" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" fill="#475569" font-weight="500">
    Free Tools for Your Calculations
  </text>
  
  <!-- Mortgage Icon (House outline) -->
  <rect x="70" y="270" width="140" height="140" rx="16" fill="#dbeafe" stroke="#3b82f6" stroke-width="3"/>
  <g transform="translate(140, 325)">
    <path d="M -30 15 L 0 -15 L 30 15 M -20 5 L -20 25 L 20 25 L 20 5 M -10 5 L -10 15 L 10 15 L 10 5" stroke="#3b82f6" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="140" y="450" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#1e293b" font-weight="600">Mortgage</text>
  
  <!-- Budget Icon (Wallet outline) -->
  <rect x="290" y="270" width="140" height="140" rx="16" fill="#fce7f3" stroke="#ec4899" stroke-width="3"/>
  <g transform="translate(360, 325)">
    <rect x="-25" y="-10" width="50" height="30" rx="3" stroke="#ec4899" stroke-width="3" fill="none"/>
    <circle cx="10" cy="5" r="4" stroke="#ec4899" stroke-width="3" fill="none"/>
  </g>
  <text x="360" y="450" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#1e293b" font-weight="600">Budget</text>
  
  <!-- Interest Icon (Chart outline) -->
  <rect x="510" y="270" width="140" height="140" rx="16" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
  <g transform="translate(580, 325)">
    <path d="M -20 20 L -20 -5 M -5 20 L -5 0 M 10 20 L 10 -10 M 25 20 L 25 5" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
    <path d="M -20 -5 L -5 0 L 10 -10 L 25 5" stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="580" y="450" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#1e293b" font-weight="600">Interest</text>
  
  <!-- Calories Icon (Flame outline) -->
  <rect x="730" y="270" width="140" height="140" rx="16" fill="#fef08a" stroke="#eab308" stroke-width="3"/>
  <g transform="translate(800, 330)">
    <path d="M 0 -15 Q -8 -5 -8 5 Q -8 15 0 20 Q 8 15 8 5 Q 8 -5 0 -15 Z" stroke="#eab308" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="800" y="450" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#1e293b" font-weight="600">Calories</text>
  
  <!-- Cycling Icon (Bike outline) -->
  <rect x="950" y="270" width="140" height="140" rx="16" fill="#e9d5ff" stroke="#a855f7" stroke-width="3"/>
  <g transform="translate(1020, 330)">
    <circle cx="-12" cy="8" r="8" stroke="#a855f7" stroke-width="2.5" fill="none"/>
    <circle cx="12" cy="8" r="8" stroke="#a855f7" stroke-width="2.5" fill="none"/>
    <path d="M -12 8 L 0 -5 L 0 5 L 12 8" stroke="#a855f7" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="1020" y="450" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#1e293b" font-weight="600">Cycling</text>
  
  <text x="600" y="530" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#64748b" font-weight="500">
    50+ calculators for finance, health, conversions and more
  </text>
</svg>
`);

// Generate PNG
await sharp(svg)
  .png({ quality: 95 })
  .toFile('public/og-image.png');

console.log('✓ OG image generated: public/og-image.png');
