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
  
  <!-- Mortgage Icon: Simple House -->
  <g transform="translate(60, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/>
    <g transform="translate(80, 55)">
      <!-- Roof -->
      <path d="M -35 30 L 0 -15 L 35 30 Z" stroke="#3b82f6" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <!-- House body -->
      <rect x="-30" y="25" width="60" height="45" stroke="#3b82f6" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <!-- Door -->
      <rect x="-8" y="45" width="16" height="25" stroke="#3b82f6" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <!-- Door knob -->
      <circle cx="6" cy="58" r="2" fill="#3b82f6"/>
    </g>
  </g>
  <text x="140" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Mortgage</text>
  
  <!-- Budget Icon: Simple Piggy Bank -->
  <g transform="translate(280, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#fce7f3" stroke="#ec4899" stroke-width="4"/>
    <g transform="translate(80, 55)">
      <!-- Main body -->
      <circle cx="0" cy="15" r="20" stroke="#ec4899" stroke-width="5" fill="none"/>
      <!-- Snout -->
      <circle cx="20" cy="18" r="7" stroke="#ec4899" stroke-width="5" fill="none"/>
      <!-- Ear -->
      <rect x="-8" y="-10" width="6" height="12" stroke="#ec4899" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <!-- Coin slot on top -->
      <line x1="-6" y1="-8" x2="6" y2="-8" stroke="#ec4899" stroke-width="4" stroke-linecap="round"/>
    </g>
  </g>
  <text x="360" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Budget</text>
  
  <!-- Interest Icon: Simple Upward Arrow -->
  <g transform="translate(500, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#dcfce7" stroke="#22c55e" stroke-width="4"/>
    <g transform="translate(80, 50)">
      <!-- Arrow shaft -->
      <line x1="0" y1="40" x2="0" y2="0" stroke="#22c55e" stroke-width="6" stroke-linecap="round"/>
      <!-- Arrow head -->
      <path d="M 0 0 L -15 20 L 0 10 L 15 20 Z" fill="#22c55e" stroke="none"/>
      <!-- Percentage symbol -->
      <circle cx="-15" cy="35" r="4" fill="#22c55e"/>
      <circle cx="15" cy="35" r="4" fill="#22c55e"/>
    </g>
  </g>
  <text x="580" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Interest</text>
  
  <!-- Calories Icon: Simple Flame -->
  <g transform="translate(720, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#fef08a" stroke="#eab308" stroke-width="4"/>
    <g transform="translate(80, 50)">
      <!-- Flame -->
      <path d="M 0 -20 Q -15 -5 -12 15 Q -10 30 0 35 Q 10 30 12 15 Q 15 -5 0 -20 Z" stroke="#eab308" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <!-- Inner flame highlight -->
      <path d="M 0 0 Q -8 5 -6 18" stroke="#eab308" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
  <text x="800" y="480" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#1e293b" font-weight="700">Calories</text>
  
  <!-- Cycling Icon: Simple Bicycle -->
  <g transform="translate(940, 280)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="#e9d5ff" stroke="#a855f7" stroke-width="4"/>
    <g transform="translate(80, 60)">
      <!-- Left wheel -->
      <circle cx="-18" cy="18" r="13" stroke="#a855f7" stroke-width="4" fill="none"/>
      <circle cx="-18" cy="18" r="8" stroke="#a855f7" stroke-width="2" fill="none"/>
      <!-- Right wheel -->
      <circle cx="18" cy="18" r="13" stroke="#a855f7" stroke-width="4" fill="none"/>
      <circle cx="18" cy="18" r="8" stroke="#a855f7" stroke-width="2" fill="none"/>
      <!-- Frame -->
      <line x1="-18" y1="18" x2="0" y2="-5" stroke="#a855f7" stroke-width="4" stroke-linecap="round"/>
      <line x1="18" y1="18" x2="0" y2="-5" stroke="#a855f7" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="-5" x2="8" y2="-8" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <!-- Seat -->
      <line x1="-5" y1="-10" x2="5" y2="-10" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
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
