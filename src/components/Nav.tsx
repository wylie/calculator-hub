import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface NavCategory {
  label: string;
  items: NavItem[];
}

interface NavItem {
  path: string;
  label: string;
}

export default function Nav() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navCategories: NavCategory[] = [
    {
      label: 'Loans',
      items: [
        { path: '/mortgage', label: 'Mortgage' },
        { path: '/auto-loan', label: 'Auto Loan' },
        { path: '/refinance', label: 'Refinance' },
        { path: '/down-payment', label: 'Down Payment' },
      ],
    },
    {
      label: 'Savings & Investment',
      items: [
        { path: '/interest', label: 'Interest' },
        { path: '/compound-interest', label: 'Compound Interest' },
        { path: '/investment-growth', label: 'Investment Growth' },
        { path: '/retirement', label: 'Retirement' },
      ],
    },
    {
      label: 'Budgeting',
      items: [
        { path: '/budget', label: 'Budget' },
        { path: '/credit-card-payoff', label: 'Credit Card Payoff' },
        { path: '/net-worth', label: 'Net Worth' },
      ],
    },
    {
      label: 'Lifestyle',
      items: [
        { path: '/weather', label: 'Weather' },
        { path: '/calories', label: 'Calories' },
        { path: '/bike-gear', label: 'Bike Gear' },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isCategoryActive = (items: NavItem[]) => items.some(item => isActive(item.path));

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-slate-900 hover:text-blue-600">
            Calculator Hub
          </Link>
          <ul className="flex flex-wrap gap-0 text-sm items-center">
            <li>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>
            </li>
            {navCategories.map((category) => (
              <li key={category.label} className="relative group">
                <button
                  onClick={() => setOpenDropdown(openDropdown === category.label ? null : category.label)}
                  className={`px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap ${
                    isCategoryActive(category.items)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category.label}
                  <span className="material-symbols-outlined text-base">expand_more</span>
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-slate-200 rounded-md shadow-lg z-10 min-w-48">
                  {category.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
