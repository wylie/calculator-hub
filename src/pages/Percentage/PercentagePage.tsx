import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import AdSlot from '../../components/AdSlot';
import { formatNumber } from '../../utils/formatting';

export default function PercentagePage() {
  const [baseValue, setBaseValue] = useStickyState('percent-base', '200');
  const [percent, setPercent] = useStickyState('percent-value', '15');
  const [decimal, setDecimal] = useStickyState('percent-decimal', '0.15');

  const numericBase = parseFloat(baseValue) || 0;
  const numericPercent = parseFloat(percent) || 0;
  const numericDecimal = parseFloat(decimal) || 0;

  const percentOf = (numericBase * numericPercent) / 100;
  const percentToDecimal = numericPercent / 100;
  const decimalToPercent = numericDecimal * 100;

  const handleReset = () => {
    setBaseValue('200');
    setPercent('15');
    setDecimal('0.15');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Percentage Converter</h2>
      <p className="text-slate-600 mb-6">
        Calculate percentage of a number and convert between percent and decimal.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Inputs</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Value"
                value={baseValue}
                onChange={setBaseValue}
                type="number"
                step="0.01"
              />
              <Input
                label="Percent (%)"
                value={percent}
                onChange={setPercent}
                type="number"
                step="0.01"
              />
            </div>

            <div className="mt-6">
              <Input
                label="Decimal (for percent conversion)"
                value={decimal}
                onChange={setDecimal}
                type="number"
                step="0.001"
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
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Results</h3>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-slate-600">Percent of Value</p>
                <p className="text-3xl font-bold text-blue-600">{formatNumber(percentOf, 2)}</p>
              </div>
              <div className="text-center border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">Percent to Decimal</p>
                <p className="text-2xl font-semibold text-slate-900">{formatNumber(percentToDecimal, 4)}</p>
              </div>
              <div className="text-center border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">Decimal to Percent</p>
                <p className="text-2xl font-semibold text-slate-900">{formatNumber(decimalToPercent, 2)}%</p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>
    </div>
  );
}
