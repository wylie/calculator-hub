import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AdSlot from '../../components/AdSlot';
import AffiliateBox from '../../components/AffiliateBox';
import RelatedTools from '../../components/RelatedTools';
import { calculateCalories } from '../../utils/calculators';

export default function CaloriesPage() {
  const [sex, setSex] = useStickyState<'male' | 'female'>('calories-sex', 'male');
  const [age, setAge] = useStickyState('calories-age', '30');
  const [heightCm, setHeightCm] = useStickyState('calories-height', '178');
  const [weightKg, setWeightKg] = useStickyState('calories-weight', '80');
  const [activityLevel, setActivityLevel] = useStickyState<'sedentary' | 'light' | 'moderate' | 'very' | 'athlete'>('calories-activity', 'moderate');
  const [goal, setGoal] = useStickyState<'maintain' | 'lose' | 'gain'>('calories-goal', 'maintain');

  const result = calculateCalories({
    sex,
    age: parseFloat(age) || 0,
    heightCm: parseFloat(heightCm) || 0,
    weightKg: parseFloat(weightKg) || 0,
    activityLevel,
    goal,
  });

  const handleReset = () => {
    setSex('male');
    setAge('30');
    setHeightCm('178');
    setWeightKg('80');
    setActivityLevel('moderate');
    setGoal('maintain');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Calorie Calculator</h2>
      <p className="text-slate-600 mb-6">
        Calculate your BMR and daily calorie target based on your goals and activity level.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Sex"
                value={sex}
                onChange={(val) => setSex(val as 'male' | 'female')}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />

              <Input
                label="Age (years)"
                value={age}
                onChange={setAge}
                type="number"
                min="18"
                max="120"
              />

              <Input
                label="Height (cm)"
                value={heightCm}
                onChange={setHeightCm}
                type="number"
                min="100"
                max="250"
              />

              <Input
                label="Weight (kg)"
                value={weightKg}
                onChange={setWeightKg}
                type="number"
                min="20"
                max="500"
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity & Goals</h3>

            <Select
              label="Activity Level"
              value={activityLevel}
              onChange={(val) => setActivityLevel(val as 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete')}
              options={[
                { value: 'sedentary', label: 'Sedentary (1.2)' },
                { value: 'light', label: 'Light (1.375)' },
                { value: 'moderate', label: 'Moderate (1.55)' },
                { value: 'very', label: 'Very Active (1.725)' },
                { value: 'athlete', label: 'Athlete (1.9)' },
              ]}
              helpText="Multiplier applied to BMR to estimate TDEE"
            />

            <Select
              label="Goal"
              value={goal}
              onChange={(val) => setGoal(val as 'maintain' | 'lose' | 'gain')}
              options={[
                { value: 'maintain', label: 'Maintain Weight' },
                { value: 'lose', label: 'Lose Weight (-500 kcal)' },
                { value: 'gain', label: 'Gain Weight (+300 kcal)' },
              ]}
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
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Results</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-600">BMR (Basal Metabolic Rate)</p>
                <p className="text-3xl font-bold text-blue-600">{result.bmr}</p>
                <p className="text-xs text-slate-500 mt-1">calories per day at rest</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-600">TDEE (Total Daily Energy Expenditure)</p>
                <p className="text-2xl font-bold text-slate-900">{result.tdee}</p>
                <p className="text-xs text-slate-500 mt-1">calories with your activity level</p>
              </div>

              <div className="border-t border-slate-200 pt-4 bg-blue-50 p-3 rounded">
                <p className="text-xs text-slate-600">Daily Target</p>
                <p className="text-2xl font-bold text-blue-600">{result.dailyTarget}</p>
                <p className="text-xs text-slate-600 mt-2">
                  {goal === 'maintain'
                    ? 'Same as TDEE to maintain'
                    : goal === 'lose'
                      ? 'Deficit of 500 kcal for weight loss'
                      : 'Surplus of 300 kcal for weight gain'}
                </p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <AffiliateBox
        title="Digital Kitchen Scale"
        description="Accurately track your food portions with a reliable digital kitchen scale."
        buttonText="Shop Now"
        href="https://amzn.to/3Ms4K2Q"
        iconName="scale"
      />

      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">How this calorie calculator works</h3>
        <p className="text-sm text-slate-700 mb-3">
          This calculator estimates BMR using the Mifflin-St Jeor equation, applies your activity multiplier to estimate
          TDEE, then adjusts calories for your selected goal.
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          <li>BMR estimates resting calorie needs</li>
          <li>TDEE = BMR × activity level</li>
          <li>Goal target applies a practical deficit or surplus</li>
        </ul>
        <p className="text-xs text-slate-500 mt-4">Last updated: February 2026</p>
      </Card>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Calorie calculator FAQ</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">What is BMR?</summary>
            <p className="mt-2">BMR is the number of calories your body needs at rest to maintain basic functions.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">What is TDEE?</summary>
            <p className="mt-2">TDEE is your total daily energy expenditure after factoring in activity level.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">Is a 500 calorie deficit always right?</summary>
            <p className="mt-2">It is a common starting point for gradual fat loss. Individual needs can vary based on body size, activity, and goals.</p>
          </details>
        </div>
      </Card>

      <RelatedTools
        tools={[
          { path: '/weight', title: 'Weight Converter', icon: 'fitness_center' },
          { path: '/bike-gear', title: 'Bike Gear Calculator', icon: 'two_wheeler' },
          { path: '/length', title: 'Length Converter', icon: 'straighten' },
          { path: '/percentage', title: 'Percentage Calculator', icon: 'percent' },
        ]}
      />
    </div>
  );
}
