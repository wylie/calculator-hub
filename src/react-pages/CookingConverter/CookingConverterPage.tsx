import { useEffect } from 'react';
import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AdSlot from '../../components/AdSlot';
import RelatedTools from '../../components/RelatedTools';
import { convertCooking } from '../../utils/calculators';
import analytics from '../../utils/analytics';

const FRACTION_CHAR_MAP: Record<string, string> = {
  '¼': '1/4',
  '½': '1/2',
  '¾': '3/4',
  '⅓': '1/3',
  '⅔': '2/3',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8',
};

const parseAmount = (rawValue: string): number => {
  const normalized = rawValue
    .trim()
    .replace(/[¼½¾⅓⅔⅛⅜⅝⅞]/g, (fractionChar) => FRACTION_CHAR_MAP[fractionChar] ?? fractionChar)
    .replace(/\s+/g, ' ');

  if (!normalized) return 0;

  if (/^\d*\.?\d+$/.test(normalized)) {
    const numeric = Number.parseFloat(normalized);
    return Number.isFinite(numeric) ? numeric : Number.NaN;
  }

  const mixedMatch = normalized.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = Number.parseFloat(mixedMatch[1]);
    const numerator = Number.parseFloat(mixedMatch[2]);
    const denominator = Number.parseFloat(mixedMatch[3]);
    if (denominator === 0) return Number.NaN;
    return whole + numerator / denominator;
  }

  const fractionMatch = normalized.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = Number.parseFloat(fractionMatch[1]);
    const denominator = Number.parseFloat(fractionMatch[2]);
    if (denominator === 0) return Number.NaN;
    return numerator / denominator;
  }

  return Number.NaN;
};

export default function CookingConverterPage() {
  useEffect(() => {
    analytics.trackCalculatorView('cooking-converter');
  }, []);
  const [value, setValue] = useStickyState('cookingConverter-value', '1');
  const [fromUnit, setFromUnit] = useStickyState<'cups' | 'grams' | 'ml' | 'oz' | 'tbsp' | 'tsp'>('cookingConverter-unit', 'cups');
  const [ingredient, setIngredient] = useStickyState('cookingConverter-ingredient', 'all-purpose flour');

  const parsedValue = parseAmount(value);
  const hasValueError = value.trim().length > 0 && Number.isNaN(parsedValue);

  const result = convertCooking({
    value: Number.isFinite(parsedValue) ? parsedValue : 0,
    fromUnit,
    ingredient,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cooking Converter</h1>
        <p className="text-gray-600">Convert cooking measurements across cups, grams, milliliters, and ounces</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion</h3>
          <div className="space-y-4">
            <Input
              label="Amount"
              value={value}
              onChange={setValue}
              type="text"
              placeholder="e.g. 1/4, 0.5, 2"
              helpText="Supports decimals and fractions (example: 1/4 or 1 1/2)"
              error={hasValueError ? 'Enter a valid number or fraction (for example: 1/4)' : ''}
            />
            <Select
              label="From Unit"
              value={fromUnit}
              onChange={(val) => setFromUnit(val as 'cups' | 'grams' | 'ml' | 'oz' | 'tbsp' | 'tsp')}
              options={[
                { value: 'cups', label: 'Cups' },
                { value: 'tbsp', label: 'Tablespoons (tbsp)' },
                { value: 'tsp', label: 'Teaspoons (tsp)' },
                { value: 'grams', label: 'Grams (g)' },
                { value: 'ml', label: 'Milliliters (ml)' },
                { value: 'oz', label: 'Ounces (oz)' },
              ]}
            />
            <Select
              label="Ingredient"
              value={ingredient}
              onChange={(val) => setIngredient(val)}
              options={[
                { value: 'all-purpose flour', label: 'All-Purpose Flour' },
                { value: 'sugar', label: 'Sugar' },
                { value: 'butter', label: 'Butter' },
                { value: 'milk', label: 'Milk' },
                { value: 'water', label: 'Water' },
                { value: 'honey', label: 'Honey' },
                { value: 'oil', label: 'Oil' },
              ]}
            />
          </div>
        </Card>

        <div>
          <Card className="bg-blue-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border border-blue-200">
                <p className="text-sm text-gray-600">Cups</p>
                <p className="text-lg font-semibold text-blue-600">{result.cups.toFixed(2)} cups</p>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <p className="text-sm text-gray-600">Grams</p>
                <p className="text-lg font-semibold text-blue-600">{result.grams.toFixed(1)} g</p>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <p className="text-sm text-gray-600">Milliliters</p>
                <p className="text-lg font-semibold text-blue-600">{result.ml.toFixed(1)} ml</p>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <p className="text-sm text-gray-600">Ounces</p>
                <p className="text-lg font-semibold text-blue-600">{result.oz.toFixed(2)} oz</p>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <p className="text-sm text-gray-600">Tablespoons</p>
                <p className="text-lg font-semibold text-blue-600">{result.tbsp.toFixed(2)} tbsp</p>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <p className="text-sm text-gray-600">Teaspoons</p>
                <p className="text-lg font-semibold text-blue-600">{result.tsp.toFixed(2)} tsp</p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Cooking Tips</h3>
          <p className="text-sm text-gray-600">
            Weight measurements (grams) are more accurate than volume for baking
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Quick Facts</h3>
          <p className="text-sm text-gray-600">
            1 cup = 16 tbsp = 48 tsp = 237 ml ≈ 8 fl oz. Different ingredients have different densities
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-sm">Note</h3>
          <p className="text-sm text-gray-600">
            Flour density varies; these are standard conversions. Pack or spoon flour differently for accuracy
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-3">How Cooking Converter Works</h2>
        <p className="text-sm text-gray-600 mb-3">
          This converter helps switch between cooking measurements with ingredient-specific calculations.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>1 cup = 237 ml = 8 fl oz</li>
          <li>Conversion factors vary by ingredient density</li>
          <li>Weight measurements are more accurate than volume</li>
          <li>Metric is standard in professional baking</li>
        </ul>
        <p className="text-xs text-gray-500 mt-4">Last updated: February 2026</p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-3">Cooking Converter FAQ</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">Why do the same ingredients convert differently?</summary>
            <p className="mt-2">Different ingredients have different densities. For example, sugar is denser than flour, so 1 cup weighs more.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">Should I use grams or cups?</summary>
            <p className="mt-2">For baking, grams are more precise. For cooking, cups are fine. A kitchen scale gives best results.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">Is a fl oz the same as regular ounces?</summary>
            <p className="mt-2">No. Fluid ounces measure volume; regular ounces measure weight. For liquids, use fluid ounces.</p>
          </details>
        </div>
      </Card>

      <AdSlot />

      <RelatedTools
        tools={[
          { path: '/percentage', title: 'Percentage Calculator', icon: 'percent' },
          { path: '/power-converter', title: 'Power Converter', icon: 'flash_on' },
          { path: '/weight', title: 'Weight Converter', icon: 'fitness_center' },
        ]}
      />
    </div>
  );
}
