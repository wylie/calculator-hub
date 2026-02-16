import { useState } from 'react'
import Card from '../../components/Card'
import Input from '../../components/Input'
import AdSlot from '../../components/AdSlot'
import { calculateDownPayment } from '../../utils/calculators'
import { formatCurrency } from '../../utils/formatting'
import type { DownPaymentInput } from '../../types'

export default function DownPaymentPage() {
  const [input, setInput] = useState<DownPaymentInput>({
    price: 500000,
    percentageDown: 20,
    interestRate: 5,
    loanTerm: 30,
  })

  const result = calculateDownPayment(input)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Down Payment Calculator</h1>
        <p className="text-gray-600">Calculate your down payment and estimated monthly payment</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
          <div className="space-y-4">
            <Input
              label="Total Price ($)"
              type="number"
              value={input.price}
              onChange={(value) => setInput({ ...input, price: parseFloat(value) || 0 })}
              min="0"
              step="10000"
            />
            <Input
              label="Down Payment (%)"
              type="number"
              value={input.percentageDown}
              onChange={(value) => setInput({ ...input, percentageDown: parseFloat(value) || 0 })}
              min="0"
              max="100"
              step="0.1"
            />
            <Input
              label="Interest Rate (% Annual)"
              type="number"
              value={input.interestRate}
              onChange={(value) => setInput({ ...input, interestRate: parseFloat(value) || 0 })}
              min="0"
              step="0.1"
            />
            <Input
              label="Loan Term (Years)"
              type="number"
              value={input.loanTerm}
              onChange={(value) => setInput({ ...input, loanTerm: parseFloat(value) || 0 })}
              min="1"
              step="1"
            />
          </div>
        </Card>

        {/* Results */}
        <Card className="bg-sky-50">
          <h2 className="text-xl font-semibold mb-4 text-sky-900">Results</h2>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border border-sky-200">
              <p className="text-sm text-gray-600">Down Payment Required</p>
              <p className="text-2xl font-bold text-sky-600">{formatCurrency(result.downPaymentAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Loan Amount</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.loanAmount)}</p>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(result.monthlyPayment)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Down Payment Tips</h3>
          <p className="text-sm text-gray-600">
            Putting down 20% or more helps you avoid PMI (Private Mortgage Insurance)
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Quick Facts</h3>
          <p className="text-sm text-gray-600">
            In many areas, you can start with as little as 3-5% down with FHA loans
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Note</h3>
          <p className="text-sm text-gray-600">
            This calculator shows P&I only. Factor in taxes, insurance, and HOA fees
          </p>
        </Card>
      </div>

      <AdSlot />
    </div>
  )
}
