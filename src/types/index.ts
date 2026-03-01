// Mortgage Calculator
export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  downPaymentType: 'percent' | 'dollar';
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
}

export interface MortgageOutput {
  loanAmount: number;
  monthlyPI: number;
  monthlyTotal: number;
  totalInterest: number;
  firstMonthInterest: number;
  firstMonthPrincipal: number;
}

// Budget Calculator
export interface BudgetExpenseItem {
  id: string;
  name: string;
  amount: number;
}

export interface BudgetInput {
  monthlyIncome: number;
  expenses: BudgetExpenseItem[];
}

export interface BudgetOutput {
  totalExpenses: number;
  remaining: number;
  savingsRate: number;
  guidance: string;
}

// Weather Converter
export interface WeatherInput {
  value: number;
  fromUnit: 'C' | 'F';
}

export interface WeatherOutput {
  converted: number;
  toUnit: 'C' | 'F';
}

// Calorie Calculator
export interface CalorieInput {
  sex: 'male' | 'female';
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete';
  goal: 'maintain' | 'lose' | 'gain';
}

export interface CalorieOutput {
  bmr: number;
  tdee: number;
  dailyTarget: number;
}

// Bike Gear Calculator
export interface BikeGearInput {
  chainring: number;
  cog: number;
  wheelDiameter: number;
  cadence: number;
}

export interface BikeGearOutput {
  gearRatio: number;
  gearInches: number;
  speedMph: number;
}

export interface BikeGearCombo {
  chainring: number;
  cog: number;
  gearRatio: number;
  gearInches: number;
  speedMph: number;
}

// Interest Calculator
export interface InterestInput {
  principal: number;
  rate: number;
  time: number;
}

export interface InterestOutput {
  interest: number;
  totalAmount: number;
}

// Compound Interest Calculator
export interface CompoundInterestInput {
  principal: number;
  rate: number;
  time: number;
  compounding: number;
}

export interface CompoundInterestOutput {
  amount: number;
  interest: number;
}

// Auto Loan Calculator
export interface AutoLoanInput {
  carPrice: number;
  downPayment: number;
  downPaymentType: 'percent' | 'dollar';
  loanTerm: number;
  interestRate: number;
}

export interface AutoLoanOutput {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

// Credit Card Payoff Calculator
export interface CreditCardPayoffInput {
  balance: number;
  aprRate: number;
  monthlyPayment: number;
}

export interface CreditCardPayoffOutput {
  monthsToPayoff: number;
  yearsToPayoff: number;
  totalInterest: number;
  totalPaid: number;
}

// Retirement Calculator
export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  annualContribution: number;
  annualExpense: number;
  annualReturn: number;
  inflationRate: number;
}

export interface RetirementOutput {
  yearsToRetirement: number;
  projectedRetirementFund: number;
  annualIncomeAtRetirement: number;
  neededAtRetirement: number;
  onTrack: boolean;
}

// Investment Growth Calculator
export interface InvestmentGrowthInput {
  initialAmount: number;
  monthlyContribution: number;
  annualReturn: number;
  years: number;
}

export interface InvestmentGrowthOutput {
  finalAmount: number;
  gain: number;
  roi: number;
}

// Refinance Calculator
export interface RefinanceInput {
  remainingBalance: number;
  currentRate: number;
  newRate: number;
  originalTerm: number;
  yearsElapsed: number;
  newTerm: number;
  refinanceCost?: number;
}

export interface RefinanceOutput {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
}

// Down Payment Calculator
export interface DownPaymentInput {
  price: number;
  percentageDown: number;
  interestRate: number;
  loanTerm: number;
}

export interface DownPaymentOutput {
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPayment: number;
}

// Net Worth Calculator
export interface NetWorthInput {
  assets: Record<string, number>;
  liabilities: Record<string, number>;
}

export interface NetWorthOutput {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

// BMI Calculator
export interface BMIInput {
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
}

export interface BMIOutput {
  bmi: number;
  category: string;
  healthyWeightMin: number;
  healthyWeightMax: number;
}

// Age Calculator
export interface AgeInput {
  birthDate: Date;
  targetDate?: Date;
}

export interface AgeOutput {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: number;
}

// Tip Calculator
export interface TipInput {
  billAmount: number;
  tipPercentage: number;
  splitCount: number;
}

export interface TipOutput {
  tipAmount: number;
  totalAmount: number;
  perPersonAmount: number;
  perPersonTip: number;
}

// Salary/Hourly Converter
export interface SalaryHourlyInput {
  amount: number;
  type: 'salary' | 'hourly';
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryHourlyOutput {
  annualSalary: number;
  hourlyRate: number;
  monthlyIncome: number;
  weeklyIncome: number;
}

// Loan Calculator
export interface LoanInput {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export interface LoanOutput {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

// Time Duration Calculator
export interface TimeDurationInput {
  startTime: string;
  endTime: string;
  includeDate?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface TimeDurationOutput {
  hours: number;
  minutes: number;
  totalMinutes: number;
  totalHours: number;
  formatted: string;
}

// Tax Calculator
export interface TaxInput {
  amount: number;
  taxRate: number;
  includeTax: boolean;
}

export interface TaxOutput {
  beforeTax: number;
  taxAmount: number;
  afterTax: number;
}

// Inflation Calculator
export interface InflationInput {
  amount: number;
  startYear: number;
  endYear: number;
  inflationRate: number;
}

export interface InflationOutput {
  futureValue: number;
  totalInflation: number;
  years: number;
  purchasingPowerChange: number;
}

// Savings Calculator
export interface SavingsInput {
  goalAmount: number;
  currentSavings: number;
  monthlyContribution: number;
  interestRate: number;
}

export interface SavingsOutput {
  monthsToGoal: number;
  yearsToGoal: number;
  totalContributions: number;
  totalInterest: number;
  finalAmount: number;
}

// Loan Affordability Calculator
export interface LoanAffordabilityInput {
  monthlyIncome: number;
  monthlyDebts: number;
  desiredLoanTerm: number;
  interestRate: number;
}

export interface LoanAffordabilityOutput {
  maxMonthlyPayment: number;
  maxLoanAmount: number;
  debtToIncomeRatio: number;
  canAfford: boolean;
  affordabilityMessage: string;
}

// Rent vs Buy Calculator
export interface RentVsBuyInput {
  homePrice: number;
  downPaymentPercent: number;
  monthlyRent: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  homeInsuranceAnnual: number;
  maintenancePercent: number;
  annualRentIncrease: number;
  homeAppreciationRate: number;
  years: number;
}

export interface RentVsBuyOutput {
  totalRentPaid: number;
  totalBuyCost: number;
  homeEquity: number;
  netCostDifference: number;
  recommendation: string;
  buyMonthlyPayment: number;
  rentMonthlyCost: number;
}

// Emergency Fund Calculator
export interface EmergencyFundInput {
  monthlyExpenses: number;
  monthsOfExpenses: number;
}

export interface EmergencyFundOutput {
  recommendedAmount: number;
  currentAmount?: number;
  amountNeeded?: number;
}

// Debt-to-Income Ratio Calculator
export interface DebtToIncomeInput {
  monthlyIncome: number;
  monthlyDebts: number;
}

export interface DebtToIncomeOutput {
  debtToIncomeRatio: number;
  percentValue: number;
  statusMessage: string;
  mortgageAffordability: number;
}

// TDEE Calculator (Total Daily Energy Expenditure)
export interface TDEEInput {
  age: number;
  sex: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryactive';
}

export interface TDEEOutput {
  bmr: number;
  tdee: number;
  cutCalories: number;
  bulkCalories: number;
}

// Ideal Weight Calculator
export interface IdealWeightInput {
  heightCm: number;
  sex: 'male' | 'female';
  formula: 'devine' | 'robinson' | 'miller' | 'bmi';
}

export interface IdealWeightOutput {
  idealWeightLbs: number;
  idealWeightKg: number;
  bmiRangeLow: number;
  bmiRangeHigh: number;
}

// Water Intake Calculator
export interface WaterIntakeInput {
  weightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryactive';
}

export interface WaterIntakeOutput {
  recommendedLiters: number;
  recommendedOunces: number;
  cupsPerDay: number;
  bottlesPerDay: number;
}

// Protein Intake Calculator
export interface ProteinIntakeInput {
  weightKg: number;
  goal: 'maintain' | 'muscle' | 'loss';
}

export interface ProteinIntakeOutput {
  gramsPerKg: number;
  totalGrams: number;
  gramsPerMeal: number;
  caloriesFromProtein: number;
}

// Height Converter
export interface HeightConvertInput {
  value: number;
  fromUnit: 'ft' | 'in' | 'cm';
}

export interface HeightConvertOutput {
  inches: number;
  feet: number;
  centimeters: number;
  formatted: string;
}

// Distance Converter
export interface DistanceConvertInput {
  value: number;
  fromUnit: 'miles' | 'km';
}

export interface DistanceConvertOutput {
  miles: number;
  kilometers: number;
}

// Cooking Converter
export interface CookingConvertInput {
  value: number;
  fromUnit: 'cups' | 'grams' | 'ml' | 'oz' | 'tbsp' | 'tsp';
  ingredient: string;
}

export interface CookingConvertOutput {
  cups: number;
  grams: number;
  ml: number;
  oz: number;
  tbsp: number;
  tsp: number;
}

// Power Converter
export interface PowerConvertInput {
  value: number;
  fromUnit: 'watts' | 'hp';
}

export interface PowerConvertOutput {
  watts: number;
  horsepower: number;
}

// Cycling Power-to-Weight Calculator
export interface CyclingPowerToWeightInput {
  powerWatts: number;
  weightKg: number;
}

export interface CyclingPowerToWeightOutput {
  ratio: number;
  level: string;
  category: string;
}

// Tire Pressure Calculator
export interface TirePressureInput {
  riderWeightKg: number;
  bikeWeightKg: number;
  tireWidth: number;
  rimDiameter: number;
  riderPosition: 'road' | 'gravel' | 'mtb';
}

export interface TirePressureOutput {
  recommendedPsi: number;
  recommendedBar: number;
  minPsi: number;
  maxPsi: number;
}

// Hiking Pace Calculator
export interface HikingPaceInput {
  distance: number;
  elevation: number;
  unit: 'miles' | 'km';
  fitness: 'beginner' | 'intermediate' | 'advanced';
}

export interface HikingPaceOutput {
  timeMinutes: number;
  timeFormatted: string;
  paceMph: number;
  paceMin: number;
}

// Calories Burned Cycling Calculator
export interface CaloriesCyclingInput {
  weightKg: number;
  duration: number;
  intensity: 'easy' | 'moderate' | 'vigorous' | 'race';
}

export interface CaloriesCyclingOutput {
  caloriesBurned: number;
  minutesForBurning: Record<number, number>;
}

// Percentage Increase Calculator
export interface PercentageIncreaseInput {
  originalValue: number;
  newValue: number;
}

export interface PercentageIncreaseOutput {
  percentIncrease: number;
  increase: number;
}

// Percentage Decrease Calculator
export interface PercentageDecreaseInput {
  originalValue: number;
  newValue: number;
}

export interface PercentageDecreaseOutput {
  percentDecrease: number;
  decrease: number;
}

// Percent Change Calculator
export interface PercentChangeInput {
  startValue: number;
  endValue: number;
}

export interface PercentChangeOutput {
  percentChange: number;
  change: number;
  isIncrease: boolean;
}

// ROI Calculator
export interface ROIInput {
  initialInvestment: number;
  finalValue: number;
}

export interface ROIOutput {
  roi: number;
  gain: number;
  roiPercent: string;
}

// Fuel Efficiency Calculator
export interface FuelEfficiencyInput {
  distance: number;
  distanceUnit: 'miles' | 'km';
  fuelUsed: number;
  fuelUnit: 'gallons' | 'liters';
}

export interface FuelEfficiencyOutput {
  mpg: number;
  kmpl: number;
  costPerMile: number;
  costPer100km: number;
}

// Discount/Markup Calculator
export interface DiscountInput {
  originalPrice: number;
  discountPercent: number;
}

export interface DiscountOutput {
  discountAmount: number;
  finalPrice: number;
  savings: string;
}

// Cost of Living Calculator
export interface CostOfLivingInput {
  housing: number;
  food: number;
  transportation: number;
  utilities: number;
  healthcare: number;
  entertainment: number;
  other: number;
}

export interface CostOfLivingOutput {
  monthlyTotal: number;
  yearlyTotal: number;
  byCategory: {
    name: string;
    monthly: number;
    percent: number;
  }[];
}

// GPA Calculator
export interface GradeItem {
  id: string;
  name: string;
  grade: number;
  weight: number;
}

export interface GradeInput {
  grades: GradeItem[];
}

export interface GradeOutput {
  gpa: number;
  letterGrade: string;
  description: string;
}
