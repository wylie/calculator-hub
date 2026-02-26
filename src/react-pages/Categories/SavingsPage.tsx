import { useEffect } from 'react';
import Card from '../../components/Card';
import analytics from '../../utils/analytics';
import { generatedCalculators } from '../Generated/generatedCalculatorData';

export default function SavingsPage() {
  useEffect(() => {
    analytics.trackCalculatorView('savings');
  }, []);
  const baseTools = [
    {
      path: '/interest',
      title: 'Interest Calculator',
      description: 'Calculate simple interest earned on your principal amount over time.',
      icon: 'percent',
    },
    {
      path: '/compound-interest',
      title: 'Compound Interest Calculator',
      description: 'Watch your money grow exponentially with compound interest calculations.',
      icon: 'trending_up',
    },
    {
      path: '/investment-growth',
      title: 'Investment Growth Calculator',
      description: 'Project your investment growth with regular contributions and returns.',
      icon: 'show_chart',
    },
    {
      path: '/retirement',
      title: 'Retirement Calculator',
      description: 'Plan your retirement savings and check if you\'re on track for your goals.',
      icon: 'savings',
    },
    {
      path: '/savings',
      title: 'Savings Calculator',
      description: 'Calculate how your savings will grow over time with regular deposits.',
      icon: 'account_balance',
    },
    {
      path: '/inflation',
      title: 'Inflation Calculator',
      description: 'Calculate the impact of inflation on your money\'s future value.',
      icon: 'payments',
    },
    {
      path: '/emergency-fund',
      title: 'Emergency Fund Calculator',
      description: 'Determine the recommended size for your emergency savings fund.',
      icon: 'shield',
    },
    {
      path: '/roi',
      title: 'ROI Calculator',
      description: 'Calculate return on investment percentage and gain amount for any investment.',
      icon: 'analytics',
    },
  ];

  const generatedTools = generatedCalculators
    .filter((calculator) => calculator.category === 'savings')
    .map((calculator) => ({
      path: `/${calculator.slug}`,
      title: calculator.title,
      description: calculator.description,
      icon: calculator.icon,
    }));

  const tools = [...baseTools, ...generatedTools].filter(
    (tool, index, arr) => arr.findIndex((item) => item.path === tool.path) === index
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Savings & Investment Calculators</h1>
      <p className="text-slate-600 mb-8">
        Plan your financial future with calculators for savings, investments, retirement planning, and wealth building strategies.
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
