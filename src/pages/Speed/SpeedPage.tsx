import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AdSlot from '../../components/AdSlot';
import RelatedTools from '../../components/RelatedTools';
import { formatNumber } from '../../utils/formatting';

export default function SpeedPage() {
  const [value, setValue] = useStickyState('speed-value', '55');
  const [fromUnit, setFromUnit] = useStickyState<'mph' | 'kmh'>('speed-from', 'mph');

  const numericValue = parseFloat(value) || 0;
  const converted = fromUnit === 'mph' ? numericValue * 1.609344 : numericValue / 1.609344;
  const toUnit = fromUnit === 'mph' ? 'km/h' : 'mph';

  const handleReset = () => {
    setValue('55');
    setFromUnit('mph');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Speed Converter</h2>
      <p className="text-slate-600 mb-6">
        Convert between miles per hour and kilometers per hour.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Conversion</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Speed"
                value={value}
                onChange={setValue}
                type="number"
                step="0.1"
              />
              <Select
                label="From Unit"
                value={fromUnit}
                onChange={(val) => setFromUnit(val as 'mph' | 'kmh')}
                options={[
                  { value: 'mph', label: 'Miles per hour (mph)' },
                  { value: 'kmh', label: 'Kilometers per hour (km/h)' },
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
              <p className="text-sm text-slate-600 mb-2">Converted Speed</p>
              <p className="text-5xl font-bold text-blue-600 mb-2">
                {formatNumber(converted, 2)}
              </p>
              <p className="text-2xl font-semibold text-slate-900">{toUnit}</p>

              <div className="mt-6 p-3 bg-blue-50 rounded">
                <p className="text-xs text-slate-600">
                  {value} {fromUnit === 'mph' ? 'mph' : 'km/h'} = {formatNumber(converted, 2)} {toUnit}
                </p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <AdSlot />

      <RelatedTools
        tools={[
          { path: '/bike-gear', title: 'Bike Gear Calculator', icon: 'two_wheeler' },
          { path: '/length', title: 'Length Converter', icon: 'straighten' },
          { path: '/date-difference', title: 'Date Difference', icon: 'date_range' },
          { path: '/time', title: 'Time Converter', icon: 'schedule' },
        ]}
      />
    </div>
  );
}
