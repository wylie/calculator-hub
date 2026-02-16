import { useState } from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import AdSlot from '../../components/AdSlot';
import AffiliateBox from '../../components/AffiliateBox';
import { formatCurrency, formatPercentage } from '../../utils/formatting';

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
}

export default function BudgetPage() {
  const [income, setIncome] = useState('5000');
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', name: 'Rent', amount: 1500 },
    { id: '2', name: 'Utilities', amount: 200 },
    { id: '3', name: 'Groceries', amount: 600 },
    { id: '4', name: 'Transportation', amount: 300 },
    { id: '5', name: 'Debt', amount: 200 },
    { id: '6', name: 'Savings', amount: 500 },
  ]);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = parseFloat(income) - totalExpenses;
  const savingsCategory = expenses.find(e => e.name === 'Savings');
  const savingsRate = savingsCategory
    ? (savingsCategory.amount / parseFloat(income)) * 100
    : (Math.max(remaining, 0) / parseFloat(income)) * 100;

  const guidance =
    remaining < 0
      ? `You are over budget by ${formatCurrency(Math.abs(remaining))}`
      : `You have ${formatCurrency(remaining)} left this month`;

  const handleAddExpense = () => {
    setExpenses([
      ...expenses,
      { id: Date.now().toString(), name: 'New Expense', amount: 0 },
    ]);
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleUpdateExpense = (id: string, field: 'name' | 'amount', value: string | number) => {
    setExpenses(
      expenses.map(e =>
        e.id === id
          ? { ...e, [field]: field === 'amount' ? parseFloat(value as string) || 0 : value }
          : e
      )
    );
  };

  const handleReset = () => {
    setIncome('5000');
    setExpenses([
      { id: '1', name: 'Rent', amount: 1500 },
      { id: '2', name: 'Utilities', amount: 200 },
      { id: '3', name: 'Groceries', amount: 600 },
      { id: '4', name: 'Transportation', amount: 300 },
      { id: '5', name: 'Debt', amount: 200 },
      { id: '6', name: 'Savings', amount: 500 },
    ]);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Budget Calculator</h2>
      <p className="text-slate-600 mb-6">
        Plan your monthly budget by tracking income and expenses with real-time calculations.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Income</h3>
            <Input
              label="Net Monthly Income ($)"
              value={income}
              onChange={setIncome}
              type="number"
              min="0"
            />
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Expenses</h3>
              <button
                onClick={handleAddExpense}
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex gap-2">
                  <input
                    type="text"
                    value={expense.name}
                    onChange={(e) => handleUpdateExpense(expense.id, 'name', e.target.value)}
                    placeholder="Expense name"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => handleUpdateExpense(expense.id, 'amount', e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-24 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleRemoveExpense(expense.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
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
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Summary</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600">Income</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(parseFloat(income))}</p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">Total Expenses</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(totalExpenses)}</p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">Remaining</p>
                <p className={`text-xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(remaining)}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">Savings Rate</p>
                <p className="text-lg font-bold text-slate-900">{formatPercentage(savingsRate)}</p>
              </div>

              <div className="border-t border-slate-200 pt-3 bg-slate-50 p-3 rounded">
                <p className="text-xs font-medium text-slate-600">{guidance}</p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <AffiliateBox
        title="Budgeting Apps"
        description="Try popular budgeting apps to manage your finances more effectively."
        buttonText="Explore Apps"
        href="https://amzn.to/3OiZG1h"
        iconName="calculate"
      />
    </div>
  );
}
