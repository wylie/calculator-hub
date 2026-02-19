import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AdSlot from '../../components/AdSlot';
import RelatedTools from '../../components/RelatedTools';
import { formatNumber } from '../../utils/formatting';

export default function VolumePage() {
  const [value, setValue] = useStickyState('volume-value', '10');
  const [fromUnit, setFromUnit] = useStickyState<'gal' | 'l'>('volume-from', 'gal');

  const numericValue = parseFloat(value) || 0;
  const converted = fromUnit === 'gal' ? numericValue * 3.785411784 : numericValue / 3.785411784;
  const toUnit = fromUnit === 'gal' ? 'L' : 'gal';

  const handleReset = () => {
    setValue('10');
    setFromUnit('gal');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Volume Converter</h2>
      <p className="text-slate-600 mb-6">
        Convert between gallons and liters.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Conversion</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Volume"
                value={value}
                onChange={setValue}
                type="number"
                step="0.1"
              />
              <Select
                label="From Unit"
                value={fromUnit}
                onChange={(val) => setFromUnit(val as 'gal' | 'l')}
                options={[
                  { value: 'gal', label: 'Gallons (US)' },
                  { value: 'l', label: 'Liters (L)' },
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
              <p className="text-sm text-slate-600 mb-2">Converted Volume</p>
              <p className="text-5xl font-bold text-blue-600 mb-2">
                {formatNumber(converted, 2)}
              </p>
              <p className="text-2xl font-semibold text-slate-900">{toUnit}</p>

              <div className="mt-6 p-3 bg-blue-50 rounded">
                <p className="text-xs text-slate-600">
                  {value} {fromUnit === 'gal' ? 'gal' : 'L'} = {formatNumber(converted, 2)} {toUnit}
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
          { path: '/length', title: 'Length Converter', icon: 'straighten' },
          { path: '/area', title: 'Area Converter', icon: 'square_foot' },
          { path: '/weight', title: 'Weight Converter', icon: 'fitness_center' },
          { path: '/file-size', title: 'File Size Converter', icon: 'storage' },
        ]}
      />
    </div>
  );
}
