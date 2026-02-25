import { useEffect } from 'react';
import Card from '../../components/Card';
import analytics from '../../utils/analytics';

export default function ConvertersPage() {
  useEffect(() => {
    analytics.trackCalculatorView('converters');
  }, []);
  const tools = [
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Converters & Tools</h1>
      <p className="text-slate-600 mb-8">
        Quick and accurate unit converters for measurements, percentages, time, and everyday calculations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a key={tool.path} href={tool.path}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-3xl text-blue-600 mb-3">
                  {tool.icon}
                </span>
                <h2 className="text-base font-semibold text-slate-900 mb-2">{tool.title}</h2>
                <p className="text-xs text-slate-600">{tool.description}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
