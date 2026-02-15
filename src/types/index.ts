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
