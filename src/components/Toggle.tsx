interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  helpText?: string;
}

export default function Toggle({
  label,
  value,
  onChange,
  helpText = '',
}: ToggleProps) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </label>
      {helpText && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helpText}</p>}
    </div>
  );
}
