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
  
  <text x="600" y="120" font-family="Arial, sans-serif" font-size="110" font-weight="800" text-anchor="middle" fill="#0f172a">
    Calculator Hub
  </text>
  
  <text x="600" y="190" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="#475569" font-weight="500">
    Free Tools for Your Calculations
  </text>
  
  <!-- Mortgage Icon -->
  <g transform="translate(60, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <g transform="translate(80, 70)">
      <path d="M -40 40 L 0 -10 L 40 40 Z" stroke="#3b82f6" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <rect x="-25" y="10" width="50" height="40" stroke="#3b82f6" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <rect x="-15" y="25" width="12" height="12" stroke="#3b82f6" stroke-width="3" fill="none"/>
      <rect x="5" y="25" width="12" height="12" stroke="#3b82f6" stroke-width="3" fill="none"/>
    </g>
  </g>
  <text x="140" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Mortgage</text>
  
  <!-- Budget Icon -->
  <g transform="translate(280, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#fce7f3" stroke="#ec4899" stroke-width="4"/>
    <g transform="translate(80, 65)">
      <rect x="-30" y="-15" width="60" height="45" rx="5" stroke="#ec4899" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <circle cx="15" cy="10" r="8" stroke="#ec4899" stroke-width="4" fill="none"/>
      <line x1="-20" y1="30" x2="50" y2="30" stroke="#ec4899" stroke-width="3" stroke-linecap="round"/>
    </g>
  </g>
  <text x="360" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Budget</text>
  
  <!-- Interest Icon -->
  <g transform="translate(500, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#dcfce7" stroke="#22c55e" stroke-width="4"/>
    <g transform="translate(80, 65)">
      <path d="M -30 25 L -15 0 L 0 15 L 15 -5 L 30 10" stroke="#22c55e" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="-35" y1="35" x2="35" y2="35" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
    </g>
  </g>
  <text x="580" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Interest</text>
  
  <!-- Calories Icon -->
  <g transform="translate(720, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#fef08a" stroke="#eab308" stroke-width="4"/>
    <g transform="translate(80, 70)">
      <path d="M 0 -25 Q -20 -5 -20 15 Q -20 35 0 45 Q 20 35 20 15 Q 20 -5 0 -25 Z" stroke="#eab308" stroke-width="4" fill="none" stroke-linejoin="round"/>
    </g>
  </g>
  <text x="800" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Calories</text>
  
  <!-- Cycling Icon -->
  <g transform="translate(940, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#e9d5ff" stroke="#a855f7" stroke-width="4"/>
    <g transform="translate(80, 65)">
      <circle cx="-18" cy="20" r="12" stroke="#a855f7" stroke-width="3.5" fill="none"/>
      <circle cx="18" cy="20" r="12" stroke="#a855f7" stroke-width="3.5" fill="none"/>
      <path d="M 0 -5 L 0 15 L 15 35" stroke="#a855f7" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M -18 20 L 0 5 L 18 20" stroke="#a855f7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
  <text x="1020" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Cycling</text>
  
  <text x="600" y="560" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="#64748b" font-weight="600">
    50+ calculators for finance, health, and conversions
  </text>
</svg>
`);

// Generate PNG
await sharp(svg)
  .png({ quality: 95 })
  .toFile('public/og-image.png');

console.log('✓ OG image generated: public/og-image.png');
