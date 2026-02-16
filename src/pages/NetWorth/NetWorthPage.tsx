import { useState } from 'react'
import Card from '../../components/Card'
import AdSlot from '../../components/AdSlot'
import { calculateNetWorth } from '../../utils/calculators'
import { formatCurrency } from '../../utils/formatting'

interface AssetItem {
  id: string
  name: string
  value: number
}

interface LiabilityItem {
  id: string
  name: string
  value: number
}

const generateId = () => Math.random().toString(36).substring(2, 11)

export default function NetWorthPage() {
  const [assets, setAssets] = useState<AssetItem[]>([
    { id: generateId(), name: 'Checking Account', value: 5000 },
    { id: generateId(), name: 'Savings Account', value: 25000 },
    { id: generateId(), name: 'Home Value', value: 500000 },
    { id: generateId(), name: 'Investments', value: 100000 },
  ])

  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([
    { id: generateId(), name: 'Mortgage', value: 300000 },
    { id: generateId(), name: 'Car Loan', value: 25000 },
    { id: generateId(), name: 'Credit Cards', value: 5000 },
  ])

  const assetMap = Object.fromEntries(assets.map(a => [a.id, a.value]))
  const liabilityMap = Object.fromEntries(liabilities.map(l => [l.id, l.value]))
  const result = calculateNetWorth({ assets: assetMap, liabilities: liabilityMap })

  const handleAssetChange = (id: string, value: number) => {
    setAssets(assets.map(a => a.id === id ? { ...a, value } : a))
  }

  const handleAssetNameChange = (id: string, name: string) => {
    setAssets(assets.map(a => a.id === id ? { ...a, name } : a))
  }

  const handleLiabilityChange = (id: string, value: number) => {
    setLiabilities(liabilities.map(l => l.id === id ? { ...l, value } : l))
  }

  const handleLiabilityNameChange = (id: string, name: string) => {
    setLiabilities(liabilities.map(l => l.id === id ? { ...l, name } : l))
  }

  const addAsset = () => {
    setAssets([...assets, { id: generateId(), name: 'New Asset', value: 0 }])
  }

  const addLiability = () => {
    setLiabilities([...liabilities, { id: generateId(), name: 'New Liability', value: 0 }])
  }

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id))
  }

  const removeLiability = (id: string) => {
    setLiabilities(liabilities.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Net Worth Calculator</h1>
        <p className="text-gray-600">Track your assets and liabilities to calculate your net worth</p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <p className="text-sm text-gray-600">Total Assets</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.totalAssets)}</p>
        </Card>
        <Card className="bg-red-50">
          <p className="text-sm text-gray-600">Total Liabilities</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(result.totalLiabilities)}</p>
        </Card>
        <Card className={result.netWorth >= 0 ? 'bg-green-50' : 'bg-orange-50'}>
          <p className="text-sm text-gray-600">Net Worth</p>
          <p className={`text-2xl font-bold ${result.netWorth >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
            {formatCurrency(result.netWorth)}
          </p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Assets */}
        <div className="space-y-4">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Assets</h2>
            <div className="space-y-3">
              {assets.map(asset => (
                <div key={asset.id} className="flex gap-2">
                  <input
                    type="text"
                    value={asset.name}
                    onChange={(e) => handleAssetNameChange(asset.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="Asset name"
                  />
                  <input
                    type="number"
                    value={asset.value}
                    onChange={(e) => handleAssetChange(asset.id, parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="0"
                    min="0"
                    step="100"
                  />
                  <button
                    onClick={() => removeAsset(asset.id)}
                    className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addAsset}
              className="mt-4 w-full py-2 text-blue-600 border border-blue-300 rounded hover:bg-blue-50 text-sm font-medium"
            >
              + Add Asset
            </button>
          </Card>
        </div>

        {/* Liabilities */}
        <div className="space-y-4">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Liabilities</h2>
            <div className="space-y-3">
              {liabilities.map(liability => (
                <div key={liability.id} className="flex gap-2">
                  <input
                    type="text"
                    value={liability.name}
                    onChange={(e) => handleLiabilityNameChange(liability.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="Liability name"
                  />
                  <input
                    type="number"
                    value={liability.value}
                    onChange={(e) => handleLiabilityChange(liability.id, parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="0"
                    min="0"
                    step="100"
                  />
                  <button
                    onClick={() => removeLiability(liability.id)}
                    className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addLiability}
              className="mt-4 w-full py-2 text-red-600 border border-red-300 rounded hover:bg-red-50 text-sm font-medium"
            >
              + Add Liability
            </button>
          </Card>
        </div>
      </div>

      <AdSlot />
    </div>
  )
}
