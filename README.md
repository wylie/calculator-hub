# Calculator Hub

A clean, responsive multi-calculator web app featuring mortgage, budget, weather, calorie, and bike gear calculators. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **5 Calculators**: Mortgage, Budget, Weather Converter, Calorie Calculator, and Bike Gear Calculator
- **Responsive Design**: Works great on mobile, tablet, and desktop
- **Touch-Friendly**: Optimized controls for both keyboard and touch input
- **Client-Side Only**: No backend required—all calculations run locally
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, good focus states
- **Fast**: Lightweight, no heavy dependencies
- **Monetization Ready**: AdSense placeholders and affiliate box components included

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Testing**: Vitest
- **Icons**: Google Material Symbols
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the dev server at `http://localhost:5173`.

### Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm run test       # Run tests in watch mode
npm run test:run   # Run tests once
```

## Project Structure

```
src/
├── components/
│   ├── Card.tsx          # Reusable card component
│   ├── Input.tsx         # Text input with validation
│   ├── Select.tsx        # Select/dropdown
│   ├── Toggle.tsx        # Toggle switch
│   ├── AdSlot.tsx        # AdSense placeholder
│   ├── AffiliateBox.tsx  # Affiliate link component
│   ├── Nav.tsx           # Navigation bar
│   └── Layout.tsx        # Main layout wrapper
├── pages/
│   ├── Home/
│   ├── Mortgage/
│   ├── Budget/
│   ├── Weather/
│   ├── Calories/
│   └── BikeGear/
├── utils/
│   ├── calculators.ts         # All calculator functions
│   ├── calculators.test.ts    # Unit tests
│   └── formatting.ts          # Currency, percentage formatting
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.tsx                   # Main app with routing
└── main.tsx                  # Entry point
```

## Calculator Details

### Mortgage Calculator

Calculate monthly mortgage payments, total interest, and amortization details.

- Inputs: home price, down payment (% or $), loan term, interest rate, property tax, home insurance, PMI
- Formula: Standard amortization formula with P&I calculation

### Budget Calculator

Track monthly income and expenses with real-time calculations.

- Editable expense categories
- Automatic calculation of remaining balance and savings rate
- Add/remove expense items dynamically

### Weather Converter

Quick temperature conversion between Celsius and Fahrenheit.

- Reference table with common temperatures
- 1 decimal precision

### Calorie Calculator

Calculate BMR and daily calorie targets using the Mifflin-St Jeor formula.

- Inputs: sex, age, height, weight, activity level, goal
- Supports multiple goals: maintain, lose weight, gain weight
- Activity multipliers from sedentary to athlete

### Bike Gear Calculator

Calculate gear inches and speed estimates for cycling.

- Inputs: chainring teeth, cog teeth, wheel diameter, cadence
- Outputs: gear ratio, gear inches, speed in MPH
- Preset combo comparison

## Adding AdSense

To add real AdSense support:

1. Open `src/components/AdSlot.tsx`
2. Replace the placeholder div with your AdSense script tag:

```tsx
export default function AdSlot() {
  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
        crossOrigin="anonymous"></script>
      {/* Ad unit code */}
    </>
  );
}
```

## GitHub Pages Deployment

This project is configured to deploy to GitHub Pages at `https://yourusername.github.io/calculator-hub/`.

### Configure

1. Update [`vite.config.ts`](vite.config.ts) if needed:
   ```typescript
   export default defineConfig({
     base: '/calculator-hub/',
     ...
   });
   ```

2. Update the repository name in the workflow file if necessary

### Deploy

1. Push to GitHub
2. Go to **Settings > Pages** and select "GitHub Actions" as the source
3. The workflow will automatically build and deploy on push to main

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for the deployment configuration.

## Monetization

### AdSense

- AdSlot placeholders are placed on the home page and within each calculator
- Replace with real AdSense code (see "Adding AdSense" section above)

### Affiliate Links

- Each calculator has an AffiliateBox component with sample affiliate links
- Update URLs in the page components to your actual affiliate links
- All affiliate links use `rel="nofollow sponsored"`

## Accessibility

- Semantic HTML throughout
- ARIA labels on form inputs
- Keyboard navigation support
- Good focus states with visible outlines
- Color contrast ratios meet WCAG standards
- Touch-friendly button sizes (min 44x44 px)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Disclaimer

These calculators provide estimates for educational purposes only. They are not financial, medical, or professional advice. Users should consult qualified professionals for personalized guidance.

## License

MIT

## Contributing

Contributions are welcome. Please open an issue or pull request.

---

Built with React, Vite, and Tailwind CSS.
