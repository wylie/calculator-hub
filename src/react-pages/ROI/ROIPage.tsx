import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import AdSlot from '../../components/AdSlot';
import AffiliateBox from '../../components/AffiliateBox';
import RelatedTools from '../../components/RelatedTools';
import { calculateROI } from '../../utils/calculators';
import { formatCurrency, formatPercentage } from '../../utils/formatting';

export default function ROIPage() {
  const [initialInvestment, setInitialInvestment] = useStickyState('roi-initial-investment', '10000');
  const [finalValue, setFinalValue] = useStickyState('roi-final-value', '15000');

  const result = calculateROI({
    initialInvestment: parseFloat(initialInvestment) || 0,
    finalValue: parseFloat(finalValue) || 0,
  });

  const handleReset = () => {
    setInitialInvestment('10000');
    setFinalValue('15000');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">ROI Calculator</h2>
      <p className="text-slate-600 mb-6">
        Calculate your return on investment (ROI) to measure the profitability of an investment.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Investment Details</h3>

            <Input
              label="Initial Investment ($)"
              value={initialInvestment}
              onChange={setInitialInvestment}
              type="number"
              min="0"
            />

            <Input
              label="Final Value ($)"
              value={finalValue}
              onChange={setFinalValue}
              type="number"
              min="0"
            />

            <button
              onClick={handleReset}
              className="w-full mt-6 px-4 py-2 bg-slate-200 text-slate-700 rounded-md font-medium hover:bg-slate-300"
            >
              Reset
            </button>
          </Card>
        </div>

        <div>
          <Card className="bg-blue-50">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Results</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600">ROI Percentage</p>
                <p className="text-2xl font-bold text-blue-600">{result.roiPercent}</p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">Gain Amount</p>
                <p className="text-xl font-bold text-slate-900">
                  {formatCurrency(result.gain)}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">ROI Ratio</p>
                <p className="text-sm font-semibold text-slate-900">
                  {result.roi.toFixed(2)}x
                </p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold mb-2 text-sm">ROI Tips</h3>
          <p className="text-sm text-gray-600">
            A positive ROI means your investment grew in value. Compare ROI across different investments to make informed decisions.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Quick Facts</h3>
          <p className="text-sm text-gray-600">
            Average stock market returns are around 10% annually over long periods. Real estate and bonds typically deliver lower returns.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Note</h3>
          <p className="text-sm text-gray-600">
            Real estate ROI should account for property appreciation and rental income. This calculator shows simple value gain only.
          </p>
        </Card>
      </div>

      <AffiliateBox
        title="Investment Strategy Guide"
        description="Learn how to build a diversified portfolio and maximize your ROI."
        buttonText="View Guide"
        href="https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Practical/dp/0062691337?crid=5U9P3KL4YQJ0&keywords=investment+books&qid=1706567890&sprefix=investment+books%2Caps%2C182&sr=8-1&linkCode=ll1&tag=simplecalcula-20&linkId=d5c4d5c5c5c5c5c5c5c5c5c5&language=en_US&ref_=as_li_ss_tl"
        iconName="trending_up"
      />

      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">How this ROI calculator works</h3>
        <p className="text-sm text-slate-700 mb-3">
          ROI measures the return on your investment as a percentage of what you initially invested. It helps you compare the profitability of different investments.
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          <li>ROI % = (Final Value - Initial Investment) / Initial Investment × 100</li>
          <li>Gain = Final Value - Initial Investment</li>
          <li>ROI Ratio = Final Value / Initial Investment</li>
        </ul>
        <p className="text-xs text-slate-500 mt-4">Last updated: February 2026</p>
      </Card>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">ROI calculator FAQ</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">What is a good ROI?</summary>
            <p className="mt-2">It depends on the investment type and time period. Stock market averages around 10% annually, while real estate and bonds vary. Compare against benchmarks in your category.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">How does ROI differ from profit?</summary>
            <p className="mt-2">Profit is the absolute dollar gain, while ROI is the percentage return relative to your investment. ROI allows better comparison across different investment sizes.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">Should I include fees and taxes in ROI?</summary>
            <p className="mt-2">For accurate ROI, subtract fees and taxes from the final value to get your net proceeds before calculating.</p>
          </details>
        </div>
      </Card>

      <RelatedTools
        tools={[
          { path: '/investment-growth', title: 'Investment Growth Calculator', icon: 'trending_up' },
          { path: '/compound-interest', title: 'Compound Interest Calculator', icon: 'calculate' },
          { path: '/interest', title: 'Interest Calculator', icon: 'percent' },
        ]}
      />
    </div>
  );
}
