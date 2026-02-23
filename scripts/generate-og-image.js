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
  
  <!-- Mortgage Icon: Home (Material Symbols) -->
  <g transform="translate(60, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <g transform="translate(60, 50)">
      <path d="M10,20 L10,30 Q10,35 15,35 L45,35 Q50,35 50,30 L50,20 L30,-10 L10,20 Z" stroke="#3b82f6" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <line x1="20" y1="20" x2="20" y2="35" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="20" x2="40" y2="35" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>
      <circle cx="25" cy="26" r="2" fill="#3b82f6"/>
      <circle cx="35" cy="26" r="2" fill="#3b82f6"/>
    </g>
  </g>
  <text x="140" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Mortgage</text>
  
  <!-- Budget Icon: Wallet (Material Symbols) -->
  <g transform="translate(280, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#fce7f3" stroke="#ec4899" stroke-width="4"/>
    <g transform="translate(60, 50)">
      <rect x="5" y="10" width="50" height="35" rx="3" stroke="#ec4899" stroke-width="3" fill="none" stroke-linejoin="round"/>
      <line x1="5" y1="25" x2="55" y2="25" stroke="#ec4899" stroke-width="3"/>
      <circle cx="50" cy="32" r="4" stroke="#ec4899" stroke-width="2" fill="none"/>
      <rect x="8" y="12" width="30" height="8" stroke="#ec4899" stroke-width="2" fill="none" stroke-linejoin="round"/>
    </g>
  </g>
  <text x="360" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Budget</text>
  
  <!-- Interest Icon: Percent (Material Symbols) -->
  <g transform="translate(500, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#dcfce7" stroke="#22c55e" stroke-width="4"/>
    <g transform="translate(60, 40)">
      <circle cx="12" cy="12" r="5" stroke="#22c55e" stroke-width="3" fill="none"/>
      <circle cx="38" cy="38" r="5" stroke="#22c55e" stroke-width="3" fill="none"/>
      <line x1="40" y1="10" x2="10" y2="40" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
    </g>
  </g>
  <text x="580" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Interest</text>
  
  <!-- Calories Icon: Nutrition (Material Symbols) -->
  <g transform="translate(720, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#fef08a" stroke="#eab308" stroke-width="4"/>
    <g transform="translate(60, 50)">
      <path d="M30,5 Q25,15 25,23 Q25,33 30,33 Q35,33 35,23 Q35,15 30,5 Z" stroke="#eab308" stroke-width="3" fill="none" stroke-linejoin="round"/>
      <path d="M20,28 Q15,35 15,40 Q15,45 20,45 L40,45 Q45,45 45,40 Q45,35 40,28" stroke="#eab308" stroke-width="3" fill="none" stroke-linejoin="round"/>
    </g>
  </g>
  <text x="800" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Calories</text>
  
  <!-- Cycling Icon: Two Wheeler (Material Symbols) -->
  <g transform="translate(940, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#e9d5ff" stroke="#a855f7" stroke-width="4"/>
    <g transform="translate(60, 50)">
      <circle cx="12" cy="35" r="10" stroke="#a855f7" stroke-width="3" fill="none"/>
      <circle cx="48" cy="35" r="10" stroke="#a855f7" stroke-width="3" fill="none"/>
      <path d="M30,15 L12,35 M30,15 L48,35 M30,15 L30,28" stroke="#a855f7" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="30" cy="15" r="3" fill="#a855f7"/>
      <line x1="32" y1="15" x2="40" y2="10" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round"/>
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
