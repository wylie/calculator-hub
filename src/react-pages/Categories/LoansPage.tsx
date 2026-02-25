import { useEffect } from 'react';
import Card from '../../components/Card';
import analytics from '../../utils/analytics';

export default function LoansPage() {
  useEffect(() => {
    analytics.trackCalculatorView('loans');
  }, []);
  const tools = [
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Loans & Real Estate Calculators</h1>
      <p className="text-slate-600 mb-8">
        Make informed decisions about mortgages, auto loans, refinancing, and home buying with our comprehensive loan calculators.
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
