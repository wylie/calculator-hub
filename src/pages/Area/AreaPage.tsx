import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AdSlot from '../../components/AdSlot';
import { formatNumber } from '../../utils/formatting';

export default function AreaPage() {
  const [value, setValue] = useStickyState('area-value', '100');
  const [fromUnit, setFromUnit] = useStickyState<'sqft' | 'sqm'>('area-from', 'sqft');

  const numericValue = parseFloat(value) || 0;
  const converted = fromUnit === 'sqft' ? numericValue * 0.09290304 : numericValue / 0.09290304;
  const toUnit = fromUnit === 'sqft' ? 'sq m' : 'sq ft';

  const handleReset = () => {
    setValue('100');
    setFromUnit('sqft');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Area Converter</h2>
      <p className="text-slate-600 mb-6">
        Convert between square feet and square meters.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Conversion</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Area"
                value={value}
                onChange={setValue}
                type="number"
                step="0.1"
              />
              <Select
                label="From Unit"
                value={fromUnit}
                onChange={(val) => setFromUnit(val as 'sqft' | 'sqm')}
                options={[
                  { value: 'sqft', label: 'Square feet (sq ft)' },
                  { value: 'sqm', label: 'Square meters (sq m)' },
                ]}
              />
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-6 px-4 py-2 bg-slate-200 text-slate-700 rounded-md font-medium hover:bg-slate-300"
            >
              Reset
            </button>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Result</h3>
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-2">Converted Area</p>
              <p className="text-5xl font-bold text-blue-600 mb-2">
                {formatNumber(converted, 2)}
              </p>
              <p className="text-2xl font-semibold text-slate-900">{toUnit}</p>

              <div className="mt-6 p-3 bg-blue-50 rounded">
                <p className="text-xs text-slate-600">
                  {value} {fromUnit === 'sqft' ? 'sq ft' : 'sq m'} = {formatNumber(converted, 2)} {toUnit}
                </p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>
    </div>
  );
}
