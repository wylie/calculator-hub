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

export default function LoansPage() {
  useEffect(() => {
    analytics.trackCalculatorView('loans');
  }, []);
  const baseTools = [
    {
      path: '/mortgage',
      title: 'Mortgage Calculator',
      description: 'Calculate monthly payments, total interest, and amortization summary for home loans.',
      icon: 'home',
    },
    {
      path: '/auto-loan',
      title: 'Auto Loan Calculator',
      description: 'Calculate car payment and total interest costs for vehicle financing.',
      icon: 'directions_car',
    },
    {
      path: '/loan',
      title: 'Loan Calculator',
      description: 'Calculate monthly payments and amortization schedule for any type of loan.',
      icon: 'request_quote',
    },
    {
      path: '/loan-affordability',
      title: 'Loan Affordability Calculator',
      description: 'Determine how much you can afford to borrow based on your income and expenses.',
      icon: 'account_balance_wallet',
    },
    {
      path: '/refinance',
      title: 'Refinance Calculator',
      description: 'Calculate potential savings from refinancing your existing loan.',
      icon: 'gavel',
    },
    {
      path: '/down-payment',
      title: 'Down Payment Calculator',
      description: 'Calculate down payment requirements and monthly payment estimates.',
      icon: 'attach_money',
    },
    {
      path: '/rent-vs-buy',
      title: 'Rent vs Buy Calculator',
      description: 'Compare the financial impact of renting versus buying a home.',
      icon: 'real_estate_agent',
    },
    {
      path: '/personal-loan',
      title: 'Personal Loan Calculator',
      description: 'Estimate monthly payment, total interest, and total repayment costs.',
      icon: 'request_quote',
    },
    {
      path: '/student-loan',
      title: 'Student Loan Calculator',
      description: 'Project student loan payoff timeline with optional extra monthly payments.',
      icon: 'school',
    },
    {
      path: '/debt-snowball',
      title: 'Debt Snowball Calculator',
      description: 'Estimate payoff timeline using a snowball-style debt strategy.',
      icon: 'snowing',
    },
    {
      path: '/debt-avalanche',
      title: 'Debt Avalanche Calculator',
      description: 'Estimate payoff timeline by prioritizing highest APR debts first.',
      icon: 'landslide',
    },
    {
      path: '/heloc',
      title: 'HELOC Calculator',
      description: 'Estimate interest-only and repayment-phase payments for a HELOC.',
      icon: 'home_work',
    },
    {
      path: '/amortization-calculator',
      title: 'Amortization Calculator',
      description: 'View a full month-by-month amortization schedule for your loan.',
      icon: 'table_chart',
    },
    {
      path: '/loan-payment-calculator',
      title: 'Loan Payment Calculator',
      description: 'Calculate monthly payment and total cost for any standard installment loan.',
      icon: 'payments',
    },
    {
      path: '/property-tax',
      title: 'Property Tax Calculator',
      description: 'Estimate annual and monthly property tax from value and tax rate.',
      icon: 'holiday_village',
    },
    {
      path: '/closing-cost',
      title: 'Closing Cost Calculator',
      description: 'Estimate home-buying closing costs using percentage and fixed fees.',
      icon: 'real_estate_agent',
    },
    {
      path: '/pmi',
      title: 'PMI Calculator',
      description: 'Estimate private mortgage insurance based on LTV and PMI rate.',
      icon: 'shield',
    },
    {
      path: '/home-equity',
      title: 'Home Equity Calculator',
      description: 'Calculate your current home equity and equity percentage.',
      icon: 'home',
    },
    {
      path: '/rent-increase',
      title: 'Rent Increase Calculator',
      description: 'Measure monthly and annual impact of a rent increase.',
      icon: 'apartment',
    },
    {
      path: '/rental-yield',
      title: 'Rental Yield Calculator',
      description: 'Estimate gross and net rental yield for investment properties.',
      icon: 'home_work',
    },
  ];

  const generatedTools = generatedCalculators
    .filter((calculator) => calculator.category === 'loans' || calculator.category === 'home')
    .map((calculator) => ({
      path: `/${calculator.slug}`,
      title: calculator.title,
      description: calculator.description,
      icon: calculator.icon,
    }));

  const tools = sortByTitle(uniqueByPath([...baseTools, ...generatedTools]));

  const subcategories = buildSubcategories(tools, [
    {
      label: 'Mortgage',
      matcher: (tool) => /(mortgage|pmi|amortization|loan-payment-calculator|loan-term)/.test(tool.path),
    },
    {
      label: 'Refinance',
      matcher: (tool) => /(refinance)/.test(tool.path),
    },
    {
      label: 'Personal / Auto / Student Loans',
      matcher: (tool) => /(personal-loan|auto-loan|student-loan|business-loan|loan$)/.test(tool.path),
    },
    {
      label: 'Affordability',
      matcher: (tool) => /(affordability)/.test(tool.path),
    },
    {
      label: 'Home Equity',
      matcher: (tool) => /(heloc|home-equity|home-appreciation)/.test(tool.path),
    },
    {
      label: 'Rent vs Buy',
      matcher: (tool) => /(rent-vs-buy|rent-vs-invest|rent-increase|rental-yield|rental-cash-flow)/.test(tool.path),
    },
    {
      label: 'Property Costs',
      matcher: (tool) => /(property-tax|closing-cost|down-payment|property-value-estimator)/.test(tool.path),
    },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Loans & Real Estate Calculators</h1>
      <p className="text-slate-600 mb-8">
        Make informed decisions about mortgages, auto loans, refinancing, and home buying with our comprehensive loan calculators.
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
