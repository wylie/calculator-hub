interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  helpText?: string;
  error?: string;
  min?: string | number;
  max?: string | number;
  step?: string;
}

export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  helpText = '',
  error = '',
  min,
  max,
  step,
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`w-full px-3 py-2 border rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 focus:ring-blue-500'
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {helpText && !error && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
    </div>
  );
}
