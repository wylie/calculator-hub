- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements

- [x] Scaffold the Project

- [x] Customize the Project

- [x] Install Required Extensions

- [x] Compile the Project

- [x] Create and Run Task

- [x] Launch the Project

- [x] Ensure Documentation is Complete

## Project Summary

**Calculator Hub** is a clean, responsive multi-calculator web app built with React, TypeScript, Vite, and Tailwind CSS. It includes 5 fully functional calculators:

1. **Mortgage Calculator** - Calculate monthly payments, total interest, and amortization details
2. **Budget Calculator** - Track monthly income and expenses with dynamic categories
3. **Weather Converter** - Quick Celsius to Fahrenheit conversion with reference table
4. **Calorie Calculator** - Calculate BMR and daily targets using Mifflin-St Jeor formula
5. **Bike Gear Calculator** - Compute gear inches and speed estimates for cycling

## Key Features

- Fully responsive design (mobile, tablet, desktop)
- Touch-friendly controls for all devices
- Client-side only (no backend required)
- Accessible (semantic HTML, ARIA labels, keyboard navigation)
- AdSense placeholder components
- Affiliate box components with nofollow attributes
- Comprehensive unit tests for calculator functions
- GitHub Pages deployment ready

## Getting Started

```bash
npm install
npm run dev          # Start dev server on localhost:5173
npm run build        # Build for production
npm run test         # Run tests
```

## Deployment

The project is configured for GitHub Pages at `/calculator-hub/`. GitHub Actions workflow included in `.github/workflows/deploy.yml`.

## File Structure

- `src/components/` - Reusable UI components (Card, Input, Select, Toggle, AdSlot, AffiliateBox, Nav, Layout)
- `src/pages/` - 6 page components (Home, Mortgage, Budget, Weather, Calories, BikeGear)
- `src/utils/` - Calculator functions and formatting utilities with tests
- `src/types/` - TypeScript interfaces for all calculators
- `tailwind.config.js` - Tailwind CSS configuration
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

## Development Notes

- All calculations use accurate formulas (Mifflin-St Jeor for calories, standard amortization for mortgage, etc.)
- Tailwind CSS used exclusively for styling (no custom CSS files except index.css for @tailwind directives)
- Google Material Symbols for icons
- Inter font from Google Fonts
- React Router for navigation
- Vitest for unit testing

