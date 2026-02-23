interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  helpText?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  helpText = '',
}: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-base font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
    </div>
  );
}
