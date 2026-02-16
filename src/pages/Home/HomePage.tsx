import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import AdSlot from '../../components/AdSlot';

export default function HomePage() {
  const calculators = [
    {
      path: '/mortgage',
      title: 'Mortgage Calculator',
      description: 'Calculate monthly payments, total interest, and amortization summary.',
      icon: 'home',
    },
    {
      path: '/budget',
      title: 'Budget Calculator',
      description: 'Plan your monthly budget with income and expense tracking.',
      icon: 'wallet',
    },
    {
      path: '/interest',
      title: 'Interest Calculator',
      description: 'Calculate simple interest on your principal amount.',
      icon: 'percent',
    },
    {
      path: '/compound-interest',
      title: 'Compound Interest Calculator',
      description: 'Watch your money grow with compound interest over time.',
      icon: 'trending_up',
    },
    {
      path: '/auto-loan',
      title: 'Auto Loan Calculator',
      description: 'Calculate car payment and total interest costs.',
      icon: 'directions_car',
    },
    {
      path: '/credit-card-payoff',
      title: 'Credit Card Payoff',
      description: 'Find how long to pay off credit card debt.',
      icon: 'credit_card',
    },
    {
      path: '/retirement',
      title: 'Retirement Calculator',
      description: 'Plan your retirement and check if you\'re on track.',
      icon: 'savings',
    },
    {
      path: '/investment-growth',
      title: 'Investment Growth',
      description: 'Project your investment growth with regular contributions.',
      icon: 'show_chart',
    },
    {
      path: '/refinance',
      title: 'Refinance Calculator',
      description: 'Calculate savings from refinancing your loan.',
      icon: 'gavel',
    },
    {
      path: '/down-payment',
      title: 'Down Payment Calculator',
      description: 'Calculate down payment and monthly payment estimates.',
      icon: 'attach_money',
    },
    {
      path: '/weather',
      title: 'Weather Converter',
      description: 'Convert temperatures between Celsius and Fahrenheit instantly.',
      icon: 'thermostat',
    },
    {
      path: '/calories',
      title: 'Calorie Calculator',
      description: 'Calculate BMR and daily calorie targets based on your goals.',
      icon: 'nutrition',
    },
    {
      path: '/bike-gear',
      title: 'Bike Gear Calculator',
      description: 'Compute gear inches and speed estimates for your bike setup.',
      icon: 'two_wheeler',
    },
    {
      path: '/net-worth',
      title: 'Net Worth Calculator',
      description: 'Track your assets and liabilities to calculate your net worth.',
      icon: 'account_balance',
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome to Simple Calculators</h2>
      <p className="text-slate-600 mb-8">
        A collection of fast, lightweight calculators to help you with everyday calculations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {calculators.slice(0, 2).map((calc) => (
          <Link key={calc.path} to={calc.path}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-3xl text-blue-600 flex-shrink-0">
                  {calc.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{calc.title}</h3>
                  <p className="text-sm text-slate-600">{calc.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <AdSlot />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {calculators.slice(2).map((calc) => (
          <Link key={calc.path} to={calc.path}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-3xl text-blue-600 mb-3">
                  {calc.icon}
                </span>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{calc.title}</h3>
                <p className="text-xs text-slate-600">{calc.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
