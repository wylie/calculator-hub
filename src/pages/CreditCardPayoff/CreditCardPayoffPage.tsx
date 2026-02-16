import { useState } from 'react'
import Card from '../../components/Card'
import Input from '../../components/Input'
import AdSlot from '../../components/AdSlot'
import { calculateCreditCardPayoff } from '../../utils/calculators'
import { formatCurrency } from '../../utils/formatting'

export default function CreditCardPayoffPage() {
  const [input, setInput] = useState<{balance: string | number; aprRate: string | number; monthlyPayment: string | number}>({
    balance: 5000,
    aprRate: 18,
    monthlyPayment: 200,
  })

  const result = calculateCreditCardPayoff({
    balance: Number(input.balance) || 0,
    aprRate: Number(input.aprRate) || 0,
    monthlyPayment: Number(input.monthlyPayment) || 0,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Card Payoff Calculator</h1>
        <p className="text-gray-600">Find out how long it will take to pay off your credit card debt</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
          <div className="space-y-4">
            <Input
              label="Current Balance ($)"
              type="number"
              value={input.balance}
              onChange={(value) => setInput({ ...input, balance: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="100"
            />
            <Input
              label="APR Interest Rate (%)"
              type="number"
              value={input.aprRate}
              onChange={(value) => setInput({ ...input, aprRate: value === '' ? '' : parseFloat(value) })}
              min="0"
              step="0.1"
            />
            <Input
              label="Monthly Payment ($)"
              type="number"
              value={input.monthlyPayment}
              onChange={(value) => setInput({ ...input, monthlyPayment: value === '' ? '' : parseFloat(value) })}
              min="1"
              step="10"
            />
          </div>
        </Card>

        {/* Results */}
        <Card className="bg-orange-50">
          <h2 className="text-xl font-semibold mb-4 text-orange-900">Results</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Time to Pay Off</p>
              <p className="text-2xl font-bold text-orange-600">
                {result.yearsToPayoff.toFixed(1)} years
              </p>
              <p className="text-xs text-gray-500">({result.monthsToPayoff} months)</p>
            </div>
            <div className="bg-white p-3 rounded border border-orange-200">
              <p className="text-sm text-gray-600">Total Interest Paid</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(result.totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount Paid</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.totalPaid)}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-3">Payoff Tip</h2>
        <p className="text-gray-600">
          Increasing your monthly payment can significantly reduce the time and total interest paid. Try adjusting your monthly payment above to see the difference!
        </p>
      </Card>

      <AdSlot />
    </div>
  )
}
