import React, { useState, useRef, useEffect } from 'react';
import { generatedCalculators } from '../react-pages/Generated/generatedCalculatorData';

export default function CalculatorSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = generatedCalculators.filter(calc =>
        calc.title.toLowerCase().includes(value.toLowerCase()) ||
        calc.slug.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setDropdownOpen(true);
    } else {
      setResults([]);
      setDropdownOpen(false);
    }
    setHighlighted(-1);
  };

  const handleSelect = (slug: string) => {
    setQuery('');
    setResults([]);
    setDropdownOpen(false);
    window.location.href = `/${slug}`;
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlighted((prev) => Math.min(prev + 1, results.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlighted((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter' && highlighted >= 0) {
      handleSelect(results[highlighted].slug);
    } else if (e.key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search calculators..."
        className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        aria-label="Search calculators"
      />
      {dropdownOpen && results.length > 0 && (
        <ul ref={dropdownRef} className="absolute left-0 right-0 bg-white border border-slate-200 rounded-md shadow-lg mt-2 z-30 max-h-72 overflow-y-auto">
          {results.map((calc, idx) => (
            <li
              key={calc.slug}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${highlighted === idx ? 'bg-blue-100' : ''}`}
              onClick={() => handleSelect(calc.slug)}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {calc.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
