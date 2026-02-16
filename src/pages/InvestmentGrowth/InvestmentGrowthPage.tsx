import useStickyState from '../../utils/useStickyState'
import Card from '../../components/Card'
import Input from '../../components/Input'
import AdSlot from '../../components/AdSlot'
import { calculateInvestmentGrowth } from '../../utils/calculators'
import { formatCurrency, formatPercentage } from '../../utils/formatting'

export default function InvestmentGrowthPage() {
  const [input, setInput] = useStickyState<{initialAmount: string | number; monthlyContribution: string | number; annualReturn: string | number; years: string | number}>(
    'investment-growth-input',
    {
    initialAmount: 10000,
    monthlyContribution: 500,
    annualReturn: 8,
    years: 20,
    }
  )

  const result = calculateInvestmentGrowth({
    initialAmount: Number(input.initialAmount) || 0,
    monthlyContribution: Number(input.monthlyContribution) || 0,
    annualReturn: Number(input.annualReturn) || 0,
    years: Number(input.years) || 1,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Growth Calculator</h1>
        <p className="text-gray-600">Project your investment growth with regular contributions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
          <div className="space-y-4">
            <Input
              label="Initial Investment ($)"
              type="number"
              value={input.initialAmount}
              onChange={(value) => setInput({ ...input, initialAmount: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="1000"
            />
            <Input
              label="Monthly Contribution ($)"
              type="number"
              value={input.monthlyContribution}
              onChange={(value) => setInput({ ...input, monthlyContribution: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="50"
            />
            <Input
              label="Expected Annual Return (%)"
              type="number"
              value={input.annualReturn}
              onChange={(value) => setInput({ ...input, annualReturn: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="0.5"
            />
            <Input
              label="Time Period (Years)"
              type="number"
              value={input.years}
              onChange={(value) => setInput({ ...input, years: value === '' ? '' : parseInt(value) })}
              min="1"
              step="1"
            />
          </div>
        </Card>

        <div>
          {/* Results */}
          <Card className="bg-indigo-50">
            <h2 className="text-xl font-semibold mb-4 text-indigo-900">Results</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Total Invested</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency((Number(input.initialAmount) || 0) + (Number(input.monthlyContribution) || 0) * 12 * (Number(input.years) || 0))}
                </p>
              </div>
              <div className="bg-white p-3 rounded border border-indigo-200">
                <p className="text-sm text-gray-600">Final Amount</p>
                <p className="text-2xl font-bold text-indigo-600">{formatCurrency(result.finalAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Investment Gain</p>
                <p className="text-xl font-semibold text-gray-900">{formatCurrency(result.gain)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Return on Investment</p>
                <p className="text-lg font-semibold text-indigo-600">{formatPercentage(result.roi)}</p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-3">How It Works</h2>
        <p className="text-gray-600 text-sm">
          This calculator shows the power of compound interest combined with regular monthly contributions. Your money grows not just from returns on your initial investment, but also from returns on your contributions and accumulated gains.
        </p>
      </Card>

      <AdSlot />

      <RelatedTools
        tools={[
          { path: '/retirement', title: 'Retirement Calculator', icon: 'celebration' },
          { path: '/compound-interest', title: 'Compound Interest', icon: 'calculate' },
          { path: '/interest', title: 'Interest Calculator', icon: 'percent' },
          { path: '/net-worth', title: 'Net Worth Calculator', icon: 'account_balance' },
        ]}
      />
    </div>
  )
}
