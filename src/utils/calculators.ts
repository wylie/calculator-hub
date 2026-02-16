import type {
  MortgageInput,
  MortgageOutput,
  WeatherInput,
  WeatherOutput,
  CalorieInput,
  CalorieOutput,
  BikeGearInput,
  BikeGearOutput,
  BikeGearCombo,
  InterestInput,
  InterestOutput,
  CompoundInterestInput,
  CompoundInterestOutput,
  AutoLoanInput,
  AutoLoanOutput,
  CreditCardPayoffInput,
  CreditCardPayoffOutput,
  RetirementInput,
  RetirementOutput,
  InvestmentGrowthInput,
  InvestmentGrowthOutput,
  RefinanceInput,
  RefinanceOutput,
  DownPaymentInput,
  DownPaymentOutput,
  NetWorthInput,
  NetWorthOutput,
} from '../types';

// Mortgage Calculator
export function calculateMortgage(input: MortgageInput): MortgageOutput {
  const downPaymentAmount =
    input.downPaymentType === 'percent'
      ? (input.homePrice * input.downPayment) / 100
      : input.downPayment;

  const loanAmount = input.homePrice - downPaymentAmount;
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanTerm * 12;

  let monthlyPI = 0;
  if (monthlyRate === 0) {
    monthlyPI = loanAmount / numPayments;
  } else {
    monthlyPI =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const monthlyTax = input.propertyTax / 12;
  const monthlyInsurance = input.homeInsurance / 12;
  const monthlyPMI = input.pmi;

  const monthlyTotal = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
  const totalInterest = monthlyPI * numPayments - loanAmount;

  // First month breakdown
  const firstMonthInterest = loanAmount * monthlyRate;
  const firstMonthPrincipal = monthlyPI - firstMonthInterest;

  return {
    loanAmount,
    monthlyPI,
    monthlyTotal,
    totalInterest,
    firstMonthInterest,
    firstMonthPrincipal,
  };
}

// Weather Converter
export function convertTemperature(input: WeatherInput): WeatherOutput {
  let converted: number;

  if (input.fromUnit === 'C') {
    converted = (input.value * 9) / 5 + 32;
  } else {
    converted = ((input.value - 32) * 5) / 9;
  }

  return {
    converted: Math.round(converted * 10) / 10,
    toUnit: input.fromUnit === 'C' ? 'F' : 'C',
  };
}

// Calorie Calculator (Mifflin-St Jeor)
export function calculateCalories(input: CalorieInput): CalorieOutput {
  let bmr: number;

  if (input.sex === 'male') {
    bmr = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + 5;
  } else {
    bmr = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    athlete: 1.9,
  };

  const tdee = bmr * activityMultipliers[input.activityLevel];

  let dailyTarget = tdee;
  if (input.goal === 'lose') {
    dailyTarget = tdee - 500;
  } else if (input.goal === 'gain') {
    dailyTarget = tdee + 300;
  }

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyTarget: Math.round(dailyTarget),
  };
}

// Bike Gear Calculator
export function calculateBikeGear(input: BikeGearInput): BikeGearOutput {
  const gearRatio = input.chainring / input.cog;
  const gearInches = gearRatio * input.wheelDiameter;

  const wheelCircumference = Math.PI * input.wheelDiameter;
  const inchesPerMinute = wheelCircumference * gearRatio * input.cadence;
  const speedMph = (inchesPerMinute / 12 / 5280) * 60;

  return {
    gearRatio: Math.round(gearRatio * 100) / 100,
    gearInches: Math.round(gearInches * 10) / 10,
    speedMph: Math.round(speedMph * 10) / 10,
  };
}

export function calculateBikeGearCombos(
  wheelDiameter: number,
  cadence: number,
  combos: Array<{ chainring: number; cog: number }>
): BikeGearCombo[] {
  return combos.map(combo => {
    const result = calculateBikeGear({
      chainring: combo.chainring,
      cog: combo.cog,
      wheelDiameter,
      cadence,
    });
    return {
      chainring: combo.chainring,
      cog: combo.cog,
      ...result,
    };
  });
}

// Interest Calculator
export function calculateSimpleInterest(input: InterestInput): InterestOutput {
  const interest = (input.principal * input.rate * input.time) / 100;
  const totalAmount = input.principal + interest;

  return {
    interest: Math.round(interest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
}

// Compound Interest Calculator
export function calculateCompoundInterest(
  input: CompoundInterestInput
): CompoundInterestOutput {
  const rate = input.rate / 100;
  const amount =
    input.principal *
    Math.pow(1 + rate / input.compounding, input.compounding * input.time);
  const interest = amount - input.principal;

  return {
    amount: Math.round(amount * 100) / 100,
    interest: Math.round(interest * 100) / 100,
  };
}

// Auto Loan Calculator
export function calculateAutoLoan(input: AutoLoanInput): AutoLoanOutput {
  const downPaymentAmount =
    input.downPaymentType === 'percent'
      ? (input.carPrice * input.downPayment) / 100
      : input.downPayment;

  const loanAmount = input.carPrice - downPaymentAmount;
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanTerm * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numPayments;
  } else {
    monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalInterest = monthlyPayment * numPayments - loanAmount;

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round((monthlyPayment * numPayments) * 100) / 100,
  };
}

// Credit Card Payoff Calculator
export function calculateCreditCardPayoff(
  input: CreditCardPayoffInput
): CreditCardPayoffOutput {
  let balance = input.balance;
  let totalInterest = 0;
  let months = 0;
  const monthlyRate = input.aprRate / 100 / 12;

  while (balance > 0 && months < 600) {
    const interestCharge = balance * monthlyRate;
    balance += interestCharge;
    totalInterest += interestCharge;

    if (balance > input.monthlyPayment) {
      balance -= input.monthlyPayment;
    } else {
      break;
    }

    months++;
  }

  return {
    monthsToPayoff: months,
    yearsToPayoff: Math.round((months / 12) * 10) / 10,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round((input.balance + totalInterest) * 100) / 100,
  };
}

// Retirement Calculator
export function calculateRetirement(
  input: RetirementInput
): RetirementOutput {
  const yearsToRetirement = input.retirementAge - input.currentAge;
  const rate = input.annualReturn / 100;
  const inflationRate = input.inflationRate / 100;

  // Future value of current savings
  const futureCurrentSavings =
    input.currentSavings * Math.pow(1 + rate, yearsToRetirement);

  // Future value of annual contributions
  let futureContributions = 0;
  if (input.annualContribution > 0) {
    futureContributions =
      input.annualContribution *
      (Math.pow(1 + rate, yearsToRetirement) - 1) /
      rate;
  }

  const totalAtRetirement = futureCurrentSavings + futureContributions;

  // Calculate if it's enough based on 4% rule
  const annualExpense = totalAtRetirement * 0.04;
  const inflationAdjustedExpense =
    input.annualExpense * Math.pow(1 + inflationRate, yearsToRetirement);
  const onTrack = annualExpense >= inflationAdjustedExpense;

  return {
    yearsToRetirement,
    projectedRetirementFund: Math.round(totalAtRetirement * 100) / 100,
    annualIncomeAtRetirement: Math.round(annualExpense * 100) / 100,
    neededAtRetirement: Math.round(
      (input.annualExpense / 0.04) * Math.pow(1 + inflationRate, yearsToRetirement) * 100
    ) / 100,
    onTrack,
  };
}

// Investment Growth Calculator
export function calculateInvestmentGrowth(
  input: InvestmentGrowthInput
): InvestmentGrowthOutput {
  const rate = input.annualReturn / 100;
  let balance = input.initialAmount;
  const years = input.years;

  for (let i = 0; i < years; i++) {
    balance = balance * (1 + rate) + input.monthlyContribution * 12;
  }

  const gain = balance - input.initialAmount - input.monthlyContribution * 12 * years;
  const roi = ((balance - input.initialAmount - input.monthlyContribution * 12 * years) / (input.initialAmount + input.monthlyContribution * 12 * years)) * 100;

  return {
    finalAmount: Math.round(balance * 100) / 100,
    gain: Math.round(gain * 100) / 100,
    roi: Math.round(roi * 10) / 10,
  };
}

// Refinance Calculator
export function calculateRefinance(
  input: RefinanceInput
): RefinanceOutput {
  // Current loan monthly payment
  const currentMonthlyRate = input.currentRate / 100 / 12;
  const remainingPayments = (input.originalTerm - input.yearsElapsed) * 12;
  const currentMonthlyPayment =
    input.remainingBalance *
    (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, remainingPayments)) /
    (Math.pow(1 + currentMonthlyRate, remainingPayments) - 1);

  // New loan payment
  const newMonthlyRate = input.newRate / 100 / 12;
  const newNumPayments = input.newTerm * 12;
  let newMonthlyPayment = 0;
  if (newMonthlyRate === 0) {
    newMonthlyPayment = input.remainingBalance / newNumPayments;
  } else {
    newMonthlyPayment =
      input.remainingBalance *
      (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumPayments)) /
      (Math.pow(1 + newMonthlyRate, newNumPayments) - 1);
  }

  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const totalSavings = (monthlySavings * newNumPayments) - (input.refinanceCost || 0);
  const breakEvenMonths = input.refinanceCost ? input.refinanceCost / Math.max(monthlySavings, 1) : 0;

  return {
    currentMonthlyPayment: Math.round(currentMonthlyPayment * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths),
  };
}

// Down Payment Calculator
export function calculateDownPayment(
  input: DownPaymentInput
): DownPaymentOutput {
  const percentageAmount = (input.price * input.percentageDown) / 100;
  const loanAmount = input.price - percentageAmount;

  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanTerm * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numPayments;
  } else {
    monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  return {
    downPaymentAmount: Math.round(percentageAmount * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
  };
}

// Net Worth Calculator
export function calculateNetWorth(input: NetWorthInput): NetWorthOutput {
  const assets = Object.values(input.assets).reduce((sum, val) => sum + val, 0);
  const liabilities = Object.values(input.liabilities).reduce((sum, val) => sum + val, 0);
  const netWorth = assets - liabilities;

  return {
    totalAssets: Math.round(assets * 100) / 100,
    totalLiabilities: Math.round(liabilities * 100) / 100,
    netWorth: Math.round(netWorth * 100) / 100,
  };
}
