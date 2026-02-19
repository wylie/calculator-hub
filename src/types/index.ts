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
