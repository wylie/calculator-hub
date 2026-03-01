import { useEffect } from 'react';
import Card from '../../components/Card';
import analytics from '../../utils/analytics';
import { generatedCalculators } from '../Generated/generatedCalculatorData';

interface ToolItem {
  path: string;
  title: string;
  description: string;
  icon: string;
}

interface ToolSubcategory {
  label: string;
  items: ToolItem[];
}

const uniqueByPath = (tools: ToolItem[]): ToolItem[] => {
  return tools.filter((tool, index, allTools) => allTools.findIndex((item) => item.path === tool.path) === index);
};

const sortByTitle = (tools: ToolItem[]): ToolItem[] => {
  return [...tools].sort((left, right) => left.title.localeCompare(right.title, undefined, { sensitivity: 'base' }));
};

const buildSubcategories = (
  tools: ToolItem[],
  definitions: Array<{ label: string; matcher: (tool: ToolItem) => boolean }>
): ToolSubcategory[] => {
  let remaining = sortByTitle(uniqueByPath(tools));

  const sections = definitions.map((definition) => {
    const matched = remaining.filter(definition.matcher);
    const matchedPaths = new Set(matched.map((item) => item.path));
    remaining = remaining.filter((item) => !matchedPaths.has(item.path));

    return {
      label: definition.label,
      items: sortByTitle(uniqueByPath(matched)),
    };
  });

  if (remaining.length > 0 && sections.length > 0) {
    sections[sections.length - 1] = {
      ...sections[sections.length - 1],
      items: sortByTitle(uniqueByPath([...sections[sections.length - 1].items, ...remaining])),
    };
  }

  return sections.filter((section) => section.items.length > 0);
};

export default function ConvertersPage() {
  useEffect(() => {
    analytics.trackCalculatorView('converters');
  }, []);
  const baseTools = [
    {
      path: '/weather',
      title: 'Temperature Converter',
      description: 'Convert temperatures between Celsius and Fahrenheit instantly.',
      icon: 'thermostat',
    },
    {
      path: '/weight',
      title: 'Weight Converter',
      description: 'Convert between pounds, kilograms, ounces, and other weight units.',
      icon: 'scale',
    },
    {
      path: '/height-converter',
      title: 'Height Converter',
      description: 'Convert between feet/inches and centimeters for height measurements.',
      icon: 'straighten',
    },
    {
      path: '/distance-converter',
      title: 'Distance Converter',
      description: 'Convert between miles, kilometers, and other distance units.',
      icon: 'social_distance',
    },
    {
      path: '/length',
      title: 'Length Converter',
      description: 'Convert between inches, feet, meters, and other length units.',
      icon: 'straighten',
    },
    {
      path: '/speed',
      title: 'Speed Converter',
      description: 'Convert between MPH, KPH, and other speed units.',
      icon: 'speed',
    },
    {
      path: '/volume',
      title: 'Volume Converter',
      description: 'Convert between gallons, liters, cups, and other volume units.',
      icon: 'water',
    },
    {
      path: '/area',
      title: 'Area Converter',
      description: 'Convert between square feet, acres, hectares, and other area units.',
      icon: 'square_foot',
    },
    {
      path: '/time',
      title: 'Time Converter',
      description: 'Convert between hours, minutes, seconds, and other time units.',
      icon: 'schedule',
    },
    {
      path: '/time-duration',
      title: 'Time Duration Calculator',
      description: 'Calculate the duration between two times or add/subtract time.',
      icon: 'timer',
    },
    {
      path: '/cooking-converter',
      title: 'Cooking Converter',
      description: 'Convert between cups, tablespoons, teaspoons, and other cooking measurements.',
      icon: 'restaurant',
    },
    {
      path: '/power-converter',
      title: 'Power Converter',
      description: 'Convert between watts, horsepower, and other power units.',
      icon: 'bolt',
    },
    {
      path: '/file-size',
      title: 'File Size Converter',
      description: 'Convert between bytes, KB, MB, GB, and other file size units.',
      icon: 'storage',
    },
    {
      path: '/percentage',
      title: 'Percentage Calculator',
      description: 'Calculate percentages, find percentage of a number, and more.',
      icon: 'percent',
    },
    {
      path: '/percentage-increase',
      title: 'Percentage Increase Calculator',
      description: 'Calculate the percentage increase between two values.',
      icon: 'trending_up',
    },
    {
      path: '/percentage-decrease',
      title: 'Percentage Decrease Calculator',
      description: 'Calculate the percentage decrease between two values.',
      icon: 'trending_down',
    },
    {
      path: '/percent-change',
      title: 'Percent Change Calculator',
      description: 'Calculate the percentage change (increase or decrease) between values.',
      icon: 'compare_arrows',
    },
    {
      path: '/date-difference',
      title: 'Date Difference Calculator',
      description: 'Calculate the difference between two dates in days, weeks, or years.',
      icon: 'event',
    },
    {
      path: '/percentage-of-a-number',
      title: 'Percentage of a Number Calculator',
      description: 'Find a percentage value of any number instantly.',
      icon: 'percent',
    },
    {
      path: '/what-percent-of-x-is-y',
      title: 'What Percent of X is Y Calculator',
      description: 'Calculate what percentage one value is of another value.',
      icon: 'help',
    },
    {
      path: '/fraction-to-percent',
      title: 'Fraction to Percent Calculator',
      description: 'Convert fractions into percentages and decimals.',
      icon: 'function',
    },
    {
      path: '/percent-to-fraction',
      title: 'Percent to Fraction Calculator',
      description: 'Convert percentage values into simplified fractions.',
      icon: 'exposure',
    },
    {
      path: '/margin-calculator',
      title: 'Margin Calculator',
      description: 'Calculate gross margin and markup from revenue and cost.',
      icon: 'bar_chart',
    },
    {
      path: '/markup-calculator',
      title: 'Markup Calculator',
      description: 'Calculate selling price and margin from cost and markup.',
      icon: 'sell',
    },
    {
      path: '/work-hours',
      title: 'Work Hours Calculator',
      description: 'Calculate daily and weekly work hours from time inputs.',
      icon: 'work_history',
    },
    {
      path: '/business-days',
      title: 'Business Days Calculator',
      description: 'Count weekdays between two dates, excluding weekends.',
      icon: 'calendar_today',
    },
    {
      path: '/countdown',
      title: 'Countdown Calculator',
      description: 'Show remaining time to a target date and time.',
      icon: 'timer',
    },
    {
      path: '/week-number',
      title: 'Week Number Calculator',
      description: 'Find ISO week number and week-year values for any date.',
      icon: 'view_week',
    },
    {
      path: '/time-zone-converter',
      title: 'Time Zone Converter',
      description: 'Convert date/time values between UTC offsets.',
      icon: 'public',
    },
    {
      path: '/climbing-grade-converter',
      title: 'Climbing Grade Converter',
      description: 'Convert climbing grades between common rating scales.',
      icon: 'landscape',
    },
  ];

  const generatedTools = generatedCalculators
    .filter((calculator) => calculator.category === 'percentages' || calculator.category === 'time' || calculator.category === 'converters')
    .map((calculator) => ({
      path: `/${calculator.slug}`,
      title: calculator.title,
      description: calculator.description,
      icon: calculator.icon,
    }));

  const tools = sortByTitle(uniqueByPath([...baseTools, ...generatedTools]));

  const subcategories = buildSubcategories(tools, [
    {
      label: 'Unit Converters',
      matcher: (tool) =>
        /(weight|height|distance|length|speed|volume|area|power-converter|file-size|cooking-converter|voltage|density|pressure)/.test(tool.path),
    },
    {
      label: 'Temperature',
      matcher: (tool) => /(weather|temperature-feels-like)/.test(tool.path),
    },
    {
      label: 'Time & Date',
      matcher: (tool) => /(time|date|hours-to-days|months-between-dates|days-until)/.test(tool.path),
    },
    {
      label: 'Percentage Conversions',
      matcher: (tool) => /(percentage-of-a-number|what-percent-of-x-is-y|fraction-to-percent|percent-to-fraction|percentage$)/.test(tool.path),
    },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Converters</h1>
      <p className="text-slate-600 mb-8">
        Quick and accurate unit converters for measurements, percentages, time, and everyday calculations.
      </p>

      <div className="space-y-10">
        {subcategories.map((subcategory) => (
          <section key={subcategory.label}>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{subcategory.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategory.items.map((tool) => (
                <a key={tool.path} href={tool.path}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                      <span className="material-symbols-outlined text-3xl text-blue-600 mb-3">
                        {tool.icon}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 mb-2">{tool.title}</h3>
                      <p className="text-xs text-slate-600">{tool.description}</p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
