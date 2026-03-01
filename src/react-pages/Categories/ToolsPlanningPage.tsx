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

export default function ToolsPlanningPage() {
  useEffect(() => {
    analytics.trackCalculatorView('tools-planning');
  }, []);

  const baseTools: ToolItem[] = [
    {
      path: '/percentage',
      title: 'Percentage Calculator',
      description: 'Calculate percentages, ratios, and percentage-based values quickly.',
      icon: 'percent',
    },
    {
      path: '/percentage-increase',
      title: 'Percentage Increase Calculator',
      description: 'Find percentage increase between two values.',
      icon: 'trending_up',
    },
    {
      path: '/percentage-decrease',
      title: 'Percentage Decrease Calculator',
      description: 'Find percentage decrease between two values.',
      icon: 'trending_down',
    },
    {
      path: '/percent-change',
      title: 'Percent Change Calculator',
      description: 'Calculate percent change from an old value to a new value.',
      icon: 'compare_arrows',
    },
    {
      path: '/margin-calculator',
      title: 'Margin Calculator',
      description: 'Calculate margin and markup from cost and revenue values.',
      icon: 'bar_chart',
    },
    {
      path: '/markup-calculator',
      title: 'Markup Calculator',
      description: 'Calculate selling price and margin from cost and markup.',
      icon: 'sell',
    },
    {
      path: '/discount',
      title: 'Discount Calculator',
      description: 'Calculate markdowns and sale prices for discounts.',
      icon: 'local_offer',
    },
    {
      path: '/work-hours',
      title: 'Work Hours Calculator',
      description: 'Calculate total worked time across days and shifts.',
      icon: 'work_history',
    },
    {
      path: '/business-days',
      title: 'Business Days Calculator',
      description: 'Count weekdays between two dates.',
      icon: 'calendar_today',
    },
    {
      path: '/countdown',
      title: 'Countdown Calculator',
      description: 'Show time remaining until a target date and time.',
      icon: 'timer',
    },
    {
      path: '/week-number',
      title: 'Week Number Calculator',
      description: 'Get ISO week numbers for any date.',
      icon: 'view_week',
    },
    {
      path: '/time-zone-converter',
      title: 'Time Zone Converter',
      description: 'Convert date and time values across UTC offsets.',
      icon: 'public',
    },
    {
      path: '/cost-of-living-calculator',
      title: 'Cost of Living Calculator',
      description: 'Estimate household expenses by category and compare scenarios.',
      icon: 'apartment',
    },
    {
      path: '/emergency-fund',
      title: 'Emergency Fund Calculator',
      description: 'Estimate a target emergency savings balance.',
      icon: 'shield',
    },
    {
      path: '/budget',
      title: 'Budget Calculator',
      description: 'Plan monthly cash flow with income and expense categories.',
      icon: 'wallet',
    },
    {
      path: '/climbing-grade-converter',
      title: 'Climbing Grade Converter',
      description: 'Convert climbing grades between major scales.',
      icon: 'landscape',
    },
  ];

  const generatedTools: ToolItem[] = generatedCalculators
    .filter((calculator) => calculator.category === 'percentages' || calculator.category === 'time')
    .map((calculator) => ({
      path: `/${calculator.slug}`,
      title: calculator.title,
      description: calculator.description,
      icon: calculator.icon,
    }));

  const tools = sortByTitle(uniqueByPath([...baseTools, ...generatedTools]));

  const subcategories = buildSubcategories(tools, [
    {
      label: 'Percentage & Change',
      matcher: (tool) => /(percent|percentage|margin|markup|discount|break-even|profit)/.test(tool.path),
    },
    {
      label: 'Work & Business Time',
      matcher: (tool) =>
        /(work-hours|business-days|countdown|week-number|time-zone|workdays-between-dates|time-card|hours-worked|days-until|months-between-dates|hours-to-days)/.test(tool.path),
    },
    {
      label: 'Cost of Living & Planning',
      matcher: (tool) => /(cost-of-living|emergency-fund|budget|expense|cash-flow|climbing-grade)/.test(tool.path),
    },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Tools & Planning</h1>
      <p className="text-slate-600 mb-8">
        Practical calculators for percentage math, work and business planning, and everyday decision support.
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
