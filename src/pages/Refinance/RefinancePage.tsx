import useStickyState from '../../utils/useStickyState'
import Card from '../../components/Card'
import Input from '../../components/Input'
import AdSlot from '../../components/AdSlot'
import { calculateRefinance } from '../../utils/calculators'
import { formatCurrency } from '../../utils/formatting'

export default function RefinancePage() {
  const [input, setInput] = useStickyState<{remainingBalance: string | number; currentRate: string | number; newRate: string | number; originalTerm: string | number; yearsElapsed: string | number; newTerm: string | number; refinanceCost: string | number}>(
    'refinance-input',
    {
    remainingBalance: 250000,
    currentRate: 6,
    newRate: 4,
    originalTerm: 30,
    yearsElapsed: 5,
    newTerm: 25,
    refinanceCost: 3000,
    }
  )

  const result = calculateRefinance({
    remainingBalance: Number(input.remainingBalance) || 0,
    currentRate: Number(input.currentRate) || 0,
    newRate: Number(input.newRate) || 0,
    originalTerm: Number(input.originalTerm) || 30,
    yearsElapsed: Number(input.yearsElapsed) || 0,
    newTerm: Number(input.newTerm) || 30,
    refinanceCost: Number(input.refinanceCost) || 0,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Refinance Calculator</h1>
        <p className="text-gray-600">Calculate potential savings from refinancing your loan</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Current Loan</h2>
          <div className="space-y-4">
            <Input
              label="Remaining Balance ($)"
              type="number"
              value={input.remainingBalance}
              onChange={(value) => setInput({ ...input, remainingBalance: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="10000"
            />
            <Input
              label="Current Interest Rate (%)"
              type="number"
              value={input.currentRate}
              onChange={(value) => setInput({ ...input, currentRate: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="0.1"
            />
            <Input
              label="Original Loan Term (Years)"
              type="number"
              value={input.originalTerm}
              onChange={(value) => setInput({ ...input, originalTerm: value === '' ? '' : parseInt(value) })}
              min="1"
              step="1"
            />
            <Input
              label="Years Already Paid"
              type="number"
              value={input.yearsElapsed}
              onChange={(value) => setInput({ ...input, yearsElapsed: value === '' ? '' : parseInt(value) })}
              min="0"
              step="1"
            />
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-6">Refinance Terms</h2>
          <div className="space-y-4">
            <Input
              label="New Interest Rate (%)"
              type="number"
              value={input.newRate}
              onChange={(value) => setInput({ ...input, newRate: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="0.1"
            />
            <Input
              label="New Loan Term (Years)"
              type="number"
              value={input.newTerm}
              onChange={(value) => setInput({ ...input, newTerm: value === '' ? '' : parseInt(value) })}
              min="1"
              step="1"
            />
            <Input
              label="Refinance Costs ($)"
              type="number"
              value={input.refinanceCost}
              onChange={(value) => setInput({ ...input, refinanceCost: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="100"
            />
          </div>
        </Card>

        <div>
          {/* Results */}
          <Card className="bg-teal-50">
            <h2 className="text-xl font-semibold mb-4 text-teal-900">Results</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Current Monthly Payment</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.currentMonthlyPayment)}</p>
              </div>
              <div className="bg-white p-3 rounded border border-teal-200">
                <p className="text-sm text-gray-600">New Monthly Payment</p>
                <p className="text-xl font-semibold text-gray-900">{formatCurrency(result.newMonthlyPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Savings</p>
                <p className={`text-lg font-semibold ${result.monthlySavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.monthlySavings > 0 ? '+' : ''}{formatCurrency(result.monthlySavings)}
                </p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-sm text-gray-600">Total Savings (Net)</p>
                <p className={`text-xl font-semibold ${result.totalSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.totalSavings > 0 ? '+' : ''}{formatCurrency(result.totalSavings)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Break-Even Point</p>
                <p className="text-lg font-semibold text-gray-900">{result.breakEvenMonths} months</p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <AdSlot />
    </div>
  )
}
