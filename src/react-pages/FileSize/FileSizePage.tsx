import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AdSlot from '../../components/AdSlot';
import RelatedTools from '../../components/RelatedTools';
import { formatNumber } from '../../utils/formatting';

const sizeUnits = ['KB', 'MB', 'GB'] as const;

type SizeUnit = typeof sizeUnits[number];

const unitFactor: Record<SizeUnit, number> = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};

export default function FileSizePage() {
  const [value, setValue] = useStickyState('file-size-value', '50');
  const [fromUnit, setFromUnit] = useStickyState<SizeUnit>('file-size-from', 'MB');
  const [toUnit, setToUnit] = useStickyState<SizeUnit>('file-size-to', 'GB');

  const numericValue = parseFloat(value) || 0;
  const bytes = numericValue * unitFactor[fromUnit];
  const converted = bytes / unitFactor[toUnit];

  const handleReset = () => {
    setValue('50');
    setFromUnit('MB');
    setToUnit('GB');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">File Size Converter</h2>
      <p className="text-slate-600 mb-6">
        Convert file sizes between KB, MB, and GB.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Conversion</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Size"
                value={value}
                onChange={setValue}
                type="number"
                step="0.1"
              />
              <Select
                label="From Unit"
                value={fromUnit}
                onChange={(val) => setFromUnit(val as SizeUnit)}
                options={sizeUnits.map(unit => ({ value: unit, label: unit }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div />
              <Select
                label="To Unit"
                value={toUnit}
                onChange={(val) => setToUnit(val as SizeUnit)}
                options={sizeUnits.map(unit => ({ value: unit, label: unit }))}
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
              <p className="text-sm text-slate-600 mb-2">Converted Size</p>
              <p className="text-5xl font-bold text-blue-600 mb-2">
                {formatNumber(converted, 3)}
              </p>
              <p className="text-2xl font-semibold text-slate-900">{toUnit}</p>

              <div className="mt-6 p-3 bg-blue-50 rounded">
                <p className="text-xs text-slate-600">
                  {value} {fromUnit} = {formatNumber(converted, 3)} {toUnit}
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
          { path: '/volume', title: 'Volume Converter', icon: 'water_drop' },
          { path: '/percentage', title: 'Percentage Calculator', icon: 'percent' },
          { path: '/time', title: 'Time Converter', icon: 'schedule' },
          { path: '/speed', title: 'Speed Converter', icon: 'speed' },
        ]}
      />
    </div>
  );
}
