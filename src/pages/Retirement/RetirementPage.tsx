import { useState } from 'react'
import Card from '../../components/Card'
import Input from '../../components/Input'
import AdSlot from '../../components/AdSlot'
import { calculateRetirement } from '../../utils/calculators'
import { formatCurrency } from '../../utils/formatting'
import type { RetirementInput } from '../../types'

export default function RetirementPage() {
  const [input, setInput] = useState<RetirementInput>({
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 100000,
    annualContribution: 10000,
    annualExpense: 50000,
    annualReturn: 7,
    inflationRate: 3,
  })

  const result = calculateRetirement(input)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Retirement Calculator</h1>
        <p className="text-gray-600">Plan your retirement and see if you're on track</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          <div className="space-y-4">
            <Input
              label="Current Age"
              type="number"
              value={input.currentAge}
              onChange={(value) => setInput({ ...input, currentAge: parseInt(value) || 0 })}
              min="18"
              max="100"
              step="1"
            />
            <Input
              label="Retirement Age"
              type="number"
              value={input.retirementAge}
              onChange={(value) => setInput({ ...input, retirementAge: parseInt(value) || 0 })}
              min="18"
              max="100"
              step="1"
            />
            <Input
              label="Current Savings ($)"
              type="number"
              value={input.currentSavings}
              onChange={(value) => setInput({ ...input, currentSavings: parseFloat(value) || 0 })}
              min="0"
              step="10000"
            />
            <Input
              label="Annual Contribution ($)"
              type="number"
              value={input.annualContribution}
              onChange={(value) => setInput({ ...input, annualContribution: parseFloat(value) || 0 })}
              min="0"
              step="1000"
            />
            <Input
              label="Annual Expenses ($)"
              type="number"
              value={input.annualExpense}
              onChange={(value) => setInput({ ...input, annualExpense: parseFloat(value) || 0 })}
              min="0"
              step="1000"
            />
            <Input
              label="Expected Annual Return (%)"
              type="number"
              value={input.annualReturn}
              onChange={(value) => setInput({ ...input, annualReturn: parseFloat(value) || 0 })}
              min="0"
              step="0.5"
            />
            <Input
              label="Expected Inflation Rate (%)"
              type="number"
              value={input.inflationRate}
              onChange={(value) => setInput({ ...input, inflationRate: parseFloat(value) || 0 })}
              min="0"
              step="0.5"
            />
          </div>
        </Card>

        {/* Results */}
        <Card className={input.retirementAge > input.currentAge ? 'bg-green-50' : 'bg-red-50'}>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Years to Retirement</p>
              <p className="text-2xl font-bold text-gray-900">{result.yearsToRetirement}</p>
            </div>
            <div className="bg-white p-3 rounded">
              <p className="text-sm text-gray-600">Projected Fund at Retirement</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(result.projectedRetirementFund)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Annual Income (4% Rule)</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.annualIncomeAtRetirement)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Needed for Expenses</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.neededAtRetirement)}</p>
            </div>
            <div className={`p-3 rounded ${result.onTrack ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
              <p className="font-semibold text-gray-900">
                {result.onTrack ? '✓ On Track!' : '⚠ Not Quite There Yet'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-3">About the 4% Rule</h2>
        <p className="text-gray-600 text-sm">
          The 4% rule suggests you can safely withdraw 4% of your retirement savings annually. This estimate uses this rule to determine if your projected fund will support your lifestyle.
        </p>
      </Card>

      <AdSlot />
    </div>
  )
}
