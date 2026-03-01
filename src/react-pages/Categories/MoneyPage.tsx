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

export default function MoneyPage() {
  useEffect(() => {
    analytics.trackCalculatorView('money');
  }, []);

  const baseTools: ToolItem[] = [
    {
      path: '/budget',
      title: 'Budget Calculator',
      description: 'Plan monthly income and expenses with clear category totals.',
      icon: 'wallet',
    },
    {
      path: '/credit-card-payoff',
      title: 'Credit Card Payoff Calculator',
      description: 'Estimate payoff timelines and total interest for revolving debt.',
      icon: 'credit_card',
    },
    {
      path: '/net-worth',
      title: 'Net Worth Calculator',
      description: 'Track assets and liabilities to measure your financial position.',
      icon: 'account_balance',
    },
    {
      path: '/debt-to-income',
      title: 'Debt-to-Income Ratio Calculator',
      description: 'Calculate your DTI ratio for lending and budgeting decisions.',
      icon: 'balance',
    },
    {
      path: '/tax',
      title: 'Tax Calculator',
      description: 'Estimate taxes using percentage-based calculations.',
      icon: 'receipt_long',
    },
    {
      path: '/salary-hourly',
      title: 'Salary / Hourly Converter',
      description: 'Convert salary and hourly wages across common pay periods.',
      icon: 'schedule',
    },
    {
      path: '/discount',
      title: 'Discount Calculator',
      description: 'Calculate markdowns, markups, and final prices quickly.',
      icon: 'local_offer',
    },
    {
      path: '/cost-of-living-calculator',
      title: 'Cost of Living Calculator',
      description: 'Estimate household living costs and compare spending scenarios.',
      icon: 'apartment',
    },
    {
      path: '/interest',
      title: 'Interest Calculator',
      description: 'Calculate simple interest over time on a principal amount.',
      icon: 'percent',
    },
    {
      path: '/compound-interest',
      title: 'Compound Interest Calculator',
      description: 'Project compounded growth with contributions and return rates.',
      icon: 'trending_up',
    },
    {
      path: '/investment-growth',
      title: 'Investment Growth Calculator',
      description: 'Forecast long-term growth with regular investing.',
      icon: 'show_chart',
    },
    {
      path: '/retirement',
      title: 'Retirement Calculator',
      description: 'Estimate retirement readiness and contribution needs.',
      icon: 'savings',
    },
    {
      path: '/savings',
      title: 'Savings Calculator',
      description: 'Model savings balances over time with deposits and interest.',
      icon: 'account_balance',
    },
    {
      path: '/inflation',
      title: 'Inflation Calculator',
      description: 'See how purchasing power changes over time.',
      icon: 'payments',
    },
    {
      path: '/emergency-fund',
      title: 'Emergency Fund Calculator',
      description: 'Estimate a target emergency fund based on essential expenses.',
      icon: 'shield',
    },
    {
      path: '/roi',
      title: 'ROI Calculator',
      description: 'Measure return on investment as percentage and value gained.',
      icon: 'analytics',
    },
  ];

  const generatedTools: ToolItem[] = generatedCalculators
    .filter((calculator) => calculator.category === 'income' || calculator.category === 'savings')
    .map((calculator) => ({
      path: `/${calculator.slug}`,
      title: calculator.title,
      description: calculator.description,
      icon: calculator.icon,
    }));

  const tools = sortByTitle(uniqueByPath([...baseTools, ...generatedTools]));

  const subcategories = buildSubcategories(tools, [
    {
      label: 'Income & Paychecks',
      matcher: (tool) =>
        /(income|salary|hourly|pay|1099|w2|commission|bonus|severance|freelance)/.test(tool.path),
    },
    {
      label: 'Budgeting',
      matcher: (tool) => /(budget|cost-of-living|expense|net-worth|cash-flow|unit-price)/.test(tool.path),
    },
    {
      label: 'Debt & Credit',
      matcher: (tool) => /(debt|credit|utilization|consolidation|balance-transfer|payoff)/.test(tool.path),
    },
    {
      label: 'Taxes',
      matcher: (tool) => /(tax|after-tax|self-employment)/.test(tool.path),
    },
    {
      label: 'Retirement',
      matcher: (tool) => /(retirement|401k|ira|required-minimum-distribution|roth|traditional)/.test(tool.path),
    },
    {
      label: 'Savings & Investing',
      matcher: (tool) =>
        /(savings|interest|investment|inflation|roi|return|portfolio|stock|dividend|cd|annuity|future-value|present-value|rule-of-72|capital-gains)/.test(tool.path),
    },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Money Calculators</h1>
      <p className="text-slate-600 mb-8">
        Explore calculators for income, budgeting, debt, taxes, savings, investing, and retirement planning in one place.
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
