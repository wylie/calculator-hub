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
