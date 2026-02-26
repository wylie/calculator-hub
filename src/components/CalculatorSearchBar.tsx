import React, { useState } from 'react';
import { generatedCalculators } from '../react-pages/Generated/generatedCalculatorData';
import { useNavigate } from 'react-router-dom';

export default function CalculatorSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = generatedCalculators.filter(calc =>
        calc.title.toLowerCase().includes(value.toLowerCase()) ||
        calc.slug.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (slug) => {
    setQuery('');
    setResults([]);
    navigate(`/${slug}`);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search calculators..."
        className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        aria-label="Search calculators"
      />
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-slate-200 rounded-md shadow-lg mt-2 z-30 max-h-72 overflow-y-auto">
          {results.map(calc => (
            <li
              key={calc.slug}
              className="px-4 py-2 cursor-pointer hover:bg-blue-50"
              onClick={() => handleSelect(calc.slug)}
            >
              {calc.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
