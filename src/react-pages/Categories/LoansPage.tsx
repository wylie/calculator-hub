import Card from '../../components/Card';

export default function LoansPage() {
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
