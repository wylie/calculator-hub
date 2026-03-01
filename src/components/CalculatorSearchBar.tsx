import React, { useState, useRef, useEffect } from 'react';
import { generatedCalculators } from '../react-pages/Generated/generatedCalculatorData';

interface SearchResultItem {
  slug: string;
  title: string;
  keywords: string[];
  subcategories: string[];
}

interface SubcategoryDefinition {
  label: string;
  keywords: string[];
  matcher: (slug: string) => boolean;
}

const MANUAL_CALCULATOR_ITEMS: Array<{ slug: string; title: string; keywords?: string[] }> = [
  { slug: 'mortgage', title: 'Mortgage Calculator' },
  { slug: 'auto-loan', title: 'Auto Loan Calculator' },
  { slug: 'loan', title: 'Loan Calculator' },
  { slug: 'loan-affordability', title: 'Loan Affordability Calculator' },
  { slug: 'refinance', title: 'Refinance Calculator' },
  { slug: 'down-payment', title: 'Down Payment Calculator' },
  { slug: 'rent-vs-buy', title: 'Rent vs Buy Calculator' },
  { slug: 'personal-loan', title: 'Personal Loan Calculator' },
  { slug: 'student-loan', title: 'Student Loan Calculator' },
  { slug: 'debt-snowball', title: 'Debt Snowball Calculator' },
  { slug: 'debt-avalanche', title: 'Debt Avalanche Calculator' },
  { slug: 'heloc', title: 'HELOC Calculator' },
  { slug: 'amortization-calculator', title: 'Amortization Calculator' },
  { slug: 'loan-payment-calculator', title: 'Loan Payment Calculator' },
  { slug: 'property-tax', title: 'Property Tax Calculator' },
  { slug: 'closing-cost', title: 'Closing Cost Calculator' },
  { slug: 'pmi', title: 'PMI Calculator' },
  { slug: 'home-equity', title: 'Home Equity Calculator' },
  { slug: 'rent-increase', title: 'Rent Increase Calculator' },
  { slug: 'rental-yield', title: 'Rental Yield Calculator' },
  { slug: 'interest', title: 'Interest Calculator' },
  { slug: 'compound-interest', title: 'Compound Interest Calculator' },
  { slug: 'investment-growth', title: 'Investment Growth Calculator' },
  { slug: 'retirement', title: 'Retirement Calculator' },
  { slug: 'savings', title: 'Savings Calculator' },
  { slug: 'inflation', title: 'Inflation Calculator' },
  { slug: 'emergency-fund', title: 'Emergency Fund Calculator' },
  { slug: 'roi', title: 'ROI Calculator' },
  { slug: 'budget', title: 'Budget Calculator' },
  { slug: 'credit-card-payoff', title: 'Credit Card Payoff Calculator' },
  { slug: 'net-worth', title: 'Net Worth Calculator' },
  { slug: 'debt-to-income', title: 'Debt-to-Income Calculator' },
  { slug: 'tax', title: 'Tax Calculator' },
  { slug: 'salary-hourly', title: 'Salary / Hourly Converter' },
  { slug: 'hourly-to-salary', title: 'Hourly to Salary Calculator' },
  { slug: 'overtime-pay', title: 'Overtime Pay Calculator' },
  { slug: 'take-home-pay', title: 'Take-Home Pay Calculator' },
  { slug: 'after-tax-salary', title: 'After-Tax Salary Calculator' },
  { slug: 'pay-raise', title: 'Pay Raise Calculator' },
  { slug: 'annual-income', title: 'Annual Income Calculator' },
  { slug: 'biweekly-pay', title: 'Biweekly Pay Calculator' },
  { slug: 'monthly-income', title: 'Monthly Income Calculator' },
  { slug: 'self-employment-tax', title: 'Self-Employment Tax Calculator' },
  { slug: '1099-vs-w2', title: '1099 vs W2 Calculator' },
  { slug: 'discount', title: 'Discount Calculator' },
  { slug: 'cost-of-living-calculator', title: 'Cost of Living Calculator' },
  { slug: 'calories', title: 'Calorie Calculator' },
  { slug: 'bmi', title: 'BMI Calculator' },
  { slug: 'tdee', title: 'TDEE Calculator' },
  { slug: 'ideal-weight', title: 'Ideal Weight Calculator' },
  { slug: 'water-intake', title: 'Water Intake Calculator' },
  { slug: 'protein-intake', title: 'Protein Intake Calculator' },
  { slug: 'age', title: 'Age Calculator' },
  { slug: 'tip', title: 'Tip Calculator' },
  { slug: 'bike-gear', title: 'Bike Gear Calculator' },
  { slug: 'cycling-power-to-weight', title: 'Cycling Power-to-Weight Calculator' },
  { slug: 'tire-pressure', title: 'Tire Pressure Calculator' },
  { slug: 'hiking-pace', title: 'Hiking Pace Calculator' },
  { slug: 'calories-cycling', title: 'Calories Burned Cycling Calculator' },
  { slug: 'fuel-efficiency', title: 'Fuel Efficiency Calculator' },
  { slug: 'gpa', title: 'GPA Calculator' },
  { slug: 'body-fat', title: 'Body Fat Calculator' },
  { slug: 'lean-body-mass', title: 'Lean Body Mass Calculator' },
  { slug: 'macro-calculator', title: 'Macro Calculator' },
  { slug: 'calories-burned', title: 'Calories Burned Calculator' },
  { slug: 'one-rep-max', title: 'One Rep Max Calculator' },
  { slug: 'target-heart-rate', title: 'Target Heart Rate Calculator' },
  { slug: 'cycling-ftp', title: 'Cycling FTP Calculator' },
  { slug: 'vo2-max', title: 'VO2 Max Calculator' },
  { slug: 'trail-elevation-gain', title: 'Trail Elevation Gain Calculator' },
  { slug: 'pace-per-mile', title: 'Pace Per Mile Calculator' },
  { slug: 'weather', title: 'Temperature Converter' },
  { slug: 'weight', title: 'Weight Converter' },
  { slug: 'height-converter', title: 'Height Converter' },
  { slug: 'distance-converter', title: 'Distance Converter' },
  { slug: 'length', title: 'Length Converter' },
  { slug: 'speed', title: 'Speed Converter' },
  { slug: 'volume', title: 'Volume Converter' },
  { slug: 'area', title: 'Area Converter' },
  { slug: 'time', title: 'Time Converter' },
  { slug: 'time-duration', title: 'Time Duration Calculator' },
  { slug: 'cooking-converter', title: 'Cooking Converter', keywords: ['cook', 'cooking', 'kitchen'] },
  { slug: 'cooking-time-converter', title: 'Cooking Time Converter', keywords: ['cook', 'cooking', 'kitchen'] },
  { slug: 'power-converter', title: 'Power Converter' },
  { slug: 'file-size', title: 'File Size Converter' },
  { slug: 'percentage', title: 'Percentage Calculator' },
  { slug: 'percentage-of-a-number', title: 'Percentage of a Number Calculator' },
  { slug: 'what-percent-of-x-is-y', title: 'What Percent of X is Y Calculator' },
  { slug: 'fraction-to-percent', title: 'Fraction to Percent Calculator' },
  { slug: 'percent-to-fraction', title: 'Percent to Fraction Calculator' },
  { slug: 'margin-calculator', title: 'Margin Calculator' },
  { slug: 'markup-calculator', title: 'Markup Calculator' },
  { slug: 'percentage-increase', title: 'Percentage Increase Calculator' },
  { slug: 'percentage-decrease', title: 'Percentage Decrease Calculator' },
  { slug: 'percent-change', title: 'Percent Change Calculator' },
  { slug: 'date-difference', title: 'Date Difference Calculator' },
  { slug: 'work-hours', title: 'Work Hours Calculator' },
  { slug: 'business-days', title: 'Business Days Calculator' },
  { slug: 'countdown', title: 'Countdown Calculator' },
  { slug: 'week-number', title: 'Week Number Calculator' },
  { slug: 'time-zone-converter', title: 'Time Zone Converter' },
  { slug: 'climbing-grade-converter', title: 'Climbing Grade Converter' },
];

const EXCLUDED_SLUGS = new Set([
  'index',
  'contact',
  'privacy',
  'terms',
  'accessibility',
  'health',
  'loans',
  'converters',
  'budgeting',
  'savings-investment',
  'money',
]);

const SUBCATEGORY_DEFINITIONS: SubcategoryDefinition[] = [
  {
    label: 'Mortgage',
    keywords: ['mortgage', 'home loan'],
    matcher: (slug) => /(mortgage|pmi|amortization|loan-payment-calculator|loan-term)/.test(slug),
  },
  {
    label: 'Refinance',
    keywords: ['refinance'],
    matcher: (slug) => /(refinance)/.test(slug),
  },
  {
    label: 'Personal / Auto / Student Loans',
    keywords: ['personal loan', 'auto loan', 'student loan', 'loan'],
    matcher: (slug) => /(personal-loan|auto-loan|student-loan|business-loan|loan$)/.test(slug),
  },
  {
    label: 'Affordability',
    keywords: ['affordability', 'afford'],
    matcher: (slug) => /(affordability)/.test(slug),
  },
  {
    label: 'Home Equity',
    keywords: ['home equity', 'heloc'],
    matcher: (slug) => /(heloc|home-equity|home-appreciation)/.test(slug),
  },
  {
    label: 'Rent vs Buy',
    keywords: ['rent vs buy', 'rent', 'rental'],
    matcher: (slug) => /(rent-vs-buy|rent-vs-invest|rent-increase|rental-yield|rental-cash-flow)/.test(slug),
  },
  {
    label: 'Property Costs',
    keywords: ['property cost', 'closing cost', 'property tax'],
    matcher: (slug) => /(property-tax|closing-cost|down-payment|property-value-estimator)/.test(slug),
  },
  {
    label: 'Income & Paychecks',
    keywords: ['income', 'paycheck', 'salary', 'hourly pay'],
    matcher: (slug) => /(income|salary|hourly|pay|1099|w2|commission|bonus|severance|freelance)/.test(slug),
  },
  {
    label: 'Budgeting',
    keywords: ['budget', 'expense', 'cost of living'],
    matcher: (slug) => /(budget|cost-of-living|expense|net-worth|cash-flow|unit-price)/.test(slug),
  },
  {
    label: 'Debt & Credit',
    keywords: ['debt', 'credit', 'payoff'],
    matcher: (slug) => /(debt|credit|utilization|consolidation|balance-transfer|payoff)/.test(slug),
  },
  {
    label: 'Taxes',
    keywords: ['tax', 'after tax'],
    matcher: (slug) => /(tax|after-tax|self-employment)/.test(slug),
  },
  {
    label: 'Retirement',
    keywords: ['retirement', '401k', 'ira'],
    matcher: (slug) => /(retirement|401k|ira|required-minimum-distribution|roth|traditional)/.test(slug),
  },
  {
    label: 'Savings & Investing',
    keywords: ['savings', 'investing', 'investment', 'roi'],
    matcher: (slug) =>
      /(savings|interest|investment|inflation|roi|return|portfolio|stock|dividend|cd|annuity|future-value|present-value|rule-of-72|capital-gains)/.test(slug),
  },
  {
    label: 'Body Metrics',
    keywords: ['body metrics', 'bmi', 'body fat'],
    matcher: (slug) => /(bmi|body-fat|lean-body-mass|ideal-weight|bmr|vo2-max)/.test(slug),
  },
  {
    label: 'Nutrition',
    keywords: ['nutrition', 'calories', 'protein', 'water'],
    matcher: (slug) => /(calories|protein|water|tdee|macro|calorie-deficit|resting-metabolic-rate|tip)/.test(slug),
  },
  {
    label: 'Activity & Performance',
    keywords: ['fitness', 'cycling', 'hiking', 'performance'],
    matcher: (slug) =>
      /(bike|cycling|hiking|pace|heart-rate|one-rep-max|steps-to-miles|tire-pressure|fuel-efficiency|sleep|running-calories-burned|trail-elevation-gain|gpa|age|pregnancy-due-date)/.test(slug),
  },
  {
    label: 'Unit Converters',
    keywords: ['converter', 'units', 'convert'],
    matcher: (slug) =>
      /(weight|height|distance|length|speed|volume|area|power-converter|file-size|cooking-converter|cooking-time-converter|voltage|density|pressure)/.test(slug),
  },
  {
    label: 'Temperature',
    keywords: ['temperature', 'weather', 'fahrenheit', 'celsius'],
    matcher: (slug) => /(weather|temperature-feels-like)/.test(slug),
  },
  {
    label: 'Time & Date',
    keywords: ['time', 'date', 'countdown'],
    matcher: (slug) => /(time|date|hours-to-days|months-between-dates|days-until|countdown|week-number)/.test(slug),
  },
  {
    label: 'Percentage Conversions',
    keywords: ['percentage', 'percent', 'fraction'],
    matcher: (slug) => /(percentage-of-a-number|what-percent-of-x-is-y|fraction-to-percent|percent-to-fraction|percentage$)/.test(slug),
  },
  {
    label: 'Tools & Planning',
    keywords: ['tools', 'planning', 'work hours', 'business days'],
    matcher: (slug) =>
      /(percent|percentage|margin|markup|discount|break-even|profit|work-hours|business-days|countdown|week-number|time-zone|workdays-between-dates|time-card|hours-worked|cost-of-living|climbing-grade)/.test(slug),
  },
];

const normalize = (value: string): string => value.toLowerCase().trim();

const sortByTitle = (items: SearchResultItem[]): SearchResultItem[] => {
  return [...items].sort((left, right) => left.title.localeCompare(right.title, undefined, { sensitivity: 'base' }));
};

const buildSearchIndex = (): SearchResultItem[] => {
  const bySlug = new Map<string, SearchResultItem>();

  generatedCalculators
    .filter((calculator) => !EXCLUDED_SLUGS.has(calculator.slug))
    .forEach((calculator) => {
      bySlug.set(calculator.slug, {
        slug: calculator.slug,
        title: calculator.title,
        keywords: [calculator.category],
        subcategories: [],
      });
    });

  MANUAL_CALCULATOR_ITEMS.forEach((calculator) => {
    if (!bySlug.has(calculator.slug)) {
      bySlug.set(calculator.slug, {
        slug: calculator.slug,
        title: calculator.title,
        keywords: calculator.keywords ?? [],
        subcategories: [],
      });
      return;
    }

    const current = bySlug.get(calculator.slug);
    if (!current) return;
    bySlug.set(calculator.slug, {
      ...current,
      keywords: Array.from(new Set([...(current.keywords ?? []), ...(calculator.keywords ?? [])])),
    });
  });

  const items = Array.from(bySlug.values()).map((item) => {
    const subcategories = SUBCATEGORY_DEFINITIONS.filter((definition) => definition.matcher(item.slug)).map(
      (definition) => definition.label
    );

    return {
      ...item,
      subcategories,
    };
  });

  return sortByTitle(items);
};

const SEARCH_INDEX = buildSearchIndex();

export default function CalculatorSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const normalizedQuery = normalize(value);

      const directMatches = SEARCH_INDEX.filter((item) => {
        const searchableText = [item.title, item.slug, ...item.keywords, ...item.subcategories]
          .join(' ')
          .toLowerCase();
        return searchableText.includes(normalizedQuery);
      });

      const queryMatchedSubcategories = SUBCATEGORY_DEFINITIONS.filter((definition) => {
        const normalizedLabel = normalize(definition.label);
        const keywords = definition.keywords.map((keyword) => normalize(keyword));
        return (
          normalizedLabel.includes(normalizedQuery) ||
          normalizedQuery.includes(normalizedLabel) ||
          keywords.some((keyword) => keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword))
        );
      }).map((definition) => normalize(definition.label));

      const expandedSubcategories = new Set(queryMatchedSubcategories);

      const expandedMatches =
        expandedSubcategories.size > 0
          ? SEARCH_INDEX.filter((item) =>
              item.subcategories.some((subcategory) => expandedSubcategories.has(normalize(subcategory)))
            )
          : [];

      const seen = new Set<string>();
      const mergedResults = [...sortByTitle(directMatches), ...sortByTitle(expandedMatches)].filter((item) => {
        if (seen.has(item.slug)) return false;
        seen.add(item.slug);
        return true;
      });

      setResults(mergedResults.slice(0, 120));
      setDropdownOpen(true);
    } else {
      setResults([]);
      setDropdownOpen(false);
    }
    setHighlighted(-1);
  };

  const handleSelect = (slug: string) => {
    setQuery('');
    setResults([]);
    setDropdownOpen(false);
    window.location.href = `/${slug}`;
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlighted((prev) => Math.min(prev + 1, results.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlighted((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter' && highlighted >= 0) {
      handleSelect(results[highlighted].slug);
    } else if (e.key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search calculators..."
        className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        aria-label="Search calculators"
      />
      {dropdownOpen && results.length > 0 && (
        <ul ref={dropdownRef} className="absolute left-0 right-0 bg-white border border-slate-200 rounded-md shadow-lg mt-2 z-30 max-h-72 overflow-y-auto">
          {results.map((calc, idx) => (
            <li
              key={calc.slug}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${highlighted === idx ? 'bg-blue-100' : ''}`}
              onClick={() => handleSelect(calc.slug)}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {calc.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
