import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/mortgage', label: 'Mortgage' },
    { path: '/budget', label: 'Budget' },
    { path: '/weather', label: 'Weather' },
    { path: '/calories', label: 'Calories' },
    { path: '/bike-gear', label: 'Bike Gear' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Calculator Hub</h1>
          <ul className="flex flex-wrap gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
