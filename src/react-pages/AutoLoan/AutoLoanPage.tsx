import useStickyState from '../../utils/useStickyState'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Select from '../../components/Select'
import AdSlot from '../../components/AdSlot'
import RelatedTools from '../../components/RelatedTools'
import { calculateAutoLoan } from '../../utils/calculators'
import { formatCurrency } from '../../utils/formatting'

export default function AutoLoanPage() {
  const [input, setInput] = useStickyState<{carPrice: string | number; downPayment: string | number; downPaymentType: 'percent' | 'dollar'; loanTerm: string | number; interestRate: string | number}>(
    'auto-loan-input',
    {
    carPrice: 30000,
    downPayment: 10,
    downPaymentType: 'percent',
    loanTerm: 5,
    interestRate: 5,
    }
  )

  const result = calculateAutoLoan({
    carPrice: Number(input.carPrice) || 0,
    downPayment: Number(input.downPayment) || 0,
    downPaymentType: input.downPaymentType,
    loanTerm: Number(input.loanTerm) || 0,
    interestRate: Number(input.interestRate) || 0,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Auto Loan Calculator</h1>
        <p className="text-gray-600">Calculate your monthly car payment and total interest costs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
          <div className="space-y-4">
            <Input
              label="Car Price ($)"
              type="number"
              value={input.carPrice}
              onChange={(value) => setInput({ ...input, carPrice: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="1000"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment Type</label>
              <Select
                label=""
                value={input.downPaymentType}
                onChange={(value) => setInput({ ...input, downPaymentType: value as 'percent' | 'dollar' })}
                options={[
                  { value: 'percent', label: 'Percentage' },
                  { value: 'dollar', label: 'Dollar Amount' },
                ]}
              />
            </div>
            <Input
              label={input.downPaymentType === 'percent' ? 'Down Payment (%)' : 'Down Payment ($)'}
              type="number"
              value={input.downPayment}
              onChange={(value) => setInput({ ...input, downPayment: value === '' ? '' : parseFloat(value) })}
              min="0"
              step={input.downPaymentType === 'percent' ? '1' : '100'}
            />
            <Input
              label="Loan Term (Years)"
              type="number"
              value={input.loanTerm}
              onChange={(value) => setInput({ ...input, loanTerm: value === '' ? '' : parseFloat(value) })}
              min="1"
              max="10"
              step="1"
            />
            <Input
              label="Interest Rate (% Annual)"
              type="number"
              value={input.interestRate}
              onChange={(value) => setInput({ ...input, interestRate: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="0.1"
            />
          </div>
        </Card>

        <div>
          {/* Results */}
          <Card className="bg-purple-50">
            <h2 className="text-xl font-semibold mb-4 text-purple-900">Results</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="text-xl font-semibold text-gray-900">{formatCurrency(result.loanAmount)}</p>
              </div>
              <div className="bg-white p-3 rounded border border-purple-200">
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(result.monthlyPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Interest Paid</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.totalInterest)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.totalCost)}</p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <AdSlot />

      <RelatedTools
        tools={[
          { path: '/mortgage', title: 'Mortgage Calculator', icon: 'home' },
          { path: '/credit-card-payoff', title: 'Credit Card Payoff', icon: 'credit_card' },
          { path: '/refinance', title: 'Refinance Calculator', icon: 'build' },
          { path: '/down-payment', title: 'Down Payment Calculator', icon: 'trending_down' },
        ]}
      />
    </div>
  )
}
