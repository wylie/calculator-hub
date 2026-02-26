import { useEffect } from 'react';
import Card from '../../components/Card';
import analytics from '../../utils/analytics';
import { generatedCalculators } from '../Generated/generatedCalculatorData';

export default function BudgetingPage() {
  useEffect(() => {
    analytics.trackCalculatorView('budgeting');
  }, []);
  const baseTools = [
    {
      path: '/budget',
      title: 'Budget Calculator',
      description: 'Plan your monthly budget with comprehensive income and expense tracking.',
      icon: 'wallet',
    },
    {
      path: '/credit-card-payoff',
      title: 'Credit Card Payoff Calculator',
      description: 'Find out how long it will take to pay off your credit card debt.',
      icon: 'credit_card',
    },
    {
      path: '/net-worth',
      title: 'Net Worth Calculator',
      description: 'Track your assets and liabilities to calculate your total net worth.',
      icon: 'account_balance',
    },
    {
      path: '/debt-to-income',
      title: 'Debt-to-Income Ratio Calculator',
      description: 'Calculate your DTI ratio to assess your financial health and loan eligibility.',
      icon: 'balance',
    },
    {
      path: '/tax',
      title: 'Tax Calculator',
      description: 'Calculate sales tax or other percentage-based taxes on purchases.',
      icon: 'receipt_long',
    },
    {
      path: '/salary-hourly',
      title: 'Salary / Hourly Converter',
      description: 'Convert between annual salary and hourly wage rates.',
      icon: 'schedule',
    },
    {
      path: '/discount',
      title: 'Discount Calculator',
      description: 'Calculate discount amounts and final prices for sales and markups.',
      icon: 'local_offer',
    },
    {
      path: '/cost-of-living-calculator',
      title: 'Cost of Living Calculator',
      description: 'Track and analyze your monthly and yearly living expenses by category.',
      icon: 'apartment',
    },
    {
      path: '/hourly-to-salary',
      title: 'Hourly to Salary Calculator',
      description: 'Convert hourly wages to annual, monthly, and weekly income estimates.',
      icon: 'schedule',
    },
    {
      path: '/overtime-pay',
      title: 'Overtime Pay Calculator',
      description: 'Estimate overtime earnings and total pay for a given period.',
      icon: 'payments',
    },
    {
      path: '/take-home-pay',
      title: 'Take-Home Pay Calculator',
      description: 'Estimate net pay after taxes and common deductions.',
      icon: 'account_balance_wallet',
    },
    {
      path: '/after-tax-salary',
      title: 'After-Tax Salary Calculator',
      description: 'Convert gross annual salary into estimated after-tax income.',
      icon: 'receipt_long',
    },
    {
      path: '/pay-raise',
      title: 'Pay Raise Calculator',
      description: 'Calculate the value of a raise in annual, monthly, and hourly terms.',
      icon: 'trending_up',
    },
    {
      path: '/annual-income',
      title: 'Annual Income Calculator',
      description: 'Estimate yearly income from hourly pay, schedule, and bonuses.',
      icon: 'calendar_month',
    },
    {
      path: '/biweekly-pay',
      title: 'Biweekly Pay Calculator',
      description: 'Estimate gross and net biweekly paycheck amounts.',
      icon: 'event_repeat',
    },
    {
      path: '/monthly-income',
      title: 'Monthly Income Calculator',
      description: 'Estimate gross and net monthly income from annual compensation.',
      icon: 'calendar_view_month',
    },
    {
      path: '/self-employment-tax',
      title: 'Self-Employment Tax Calculator',
      description: 'Estimate self-employment tax and deductible tax amounts.',
      icon: 'work',
    },
    {
      path: '/1099-vs-w2',
      title: '1099 vs W2 Calculator',
      description: 'Compare estimated net outcomes between contractor and employee pay structures.',
      icon: 'compare',
    },
  ];

  const generatedTools = generatedCalculators
    .filter((calculator) => calculator.category === 'income')
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
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Budgeting & Finance Calculators</h1>
      <p className="text-slate-600 mb-8">
        Take control of your personal finances with budgeting tools, debt calculators, and financial planning resources.
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
