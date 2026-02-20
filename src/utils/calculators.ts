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
  BMIInput,
  BMIOutput,
  AgeInput,
  AgeOutput,
  TipInput,
  TipOutput,
  SalaryHourlyInput,
  SalaryHourlyOutput,
  LoanInput,
  LoanOutput,
  TimeDurationInput,
  TimeDurationOutput,
  TaxInput,
  TaxOutput,
  InflationInput,
  InflationOutput,
  SavingsInput,
  SavingsOutput,
  LoanAffordabilityInput,
  LoanAffordabilityOutput,
  RentVsBuyInput,
  RentVsBuyOutput,
  EmergencyFundInput,
  EmergencyFundOutput,
  DebtToIncomeInput,
  DebtToIncomeOutput,
  TDEEInput,
  TDEEOutput,
  IdealWeightInput,
  IdealWeightOutput,
  WaterIntakeInput,
  WaterIntakeOutput,
  ProteinIntakeInput,
  ProteinIntakeOutput,
  HeightConvertInput,
  HeightConvertOutput,
  DistanceConvertInput,
  DistanceConvertOutput,
  CookingConvertInput,
  CookingConvertOutput,
  PowerConvertInput,
  PowerConvertOutput,
  CyclingPowerToWeightInput,
  CyclingPowerToWeightOutput,
  TirePressureInput,
  TirePressureOutput,
  HikingPaceInput,
  HikingPaceOutput,
  CaloriesCyclingInput,
  CaloriesCyclingOutput,
  PercentageIncreaseInput,
  PercentageIncreaseOutput,
  PercentageDecreaseInput,
  PercentageDecreaseOutput,
  PercentChangeInput,
  PercentChangeOutput,
  ROIInput,
  ROIOutput,
  FuelEfficiencyInput,
  FuelEfficiencyOutput,
  DiscountInput,
  DiscountOutput,
  CostOfLivingInput,
  CostOfLivingOutput,
  GradeInput,
  GradeOutput,
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

// BMI Calculator
export function calculateBMI(input: BMIInput): BMIOutput {
  let heightM: number;
  let weightKg: number;

  if (input.unit === 'imperial') {
    // Convert pounds to kg and inches to meters
    weightKg = input.weight * 0.453592;
    heightM = input.height * 0.0254;
  } else {
    weightKg = input.weight;
    heightM = input.height / 100; // cm to m
  }

  const bmi = weightKg / (heightM * heightM);
  
  let category: string;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  // Calculate healthy weight range (BMI 18.5-25)
  const healthyWeightMinKg = 18.5 * heightM * heightM;
  const healthyWeightMaxKg = 25 * heightM * heightM;

  const healthyWeightMin = input.unit === 'imperial' 
    ? healthyWeightMinKg * 2.20462 
    : healthyWeightMinKg;
  const healthyWeightMax = input.unit === 'imperial' 
    ? healthyWeightMaxKg * 2.20462 
    : healthyWeightMaxKg;

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    healthyWeightMin: Math.round(healthyWeightMin * 10) / 10,
    healthyWeightMax: Math.round(healthyWeightMax * 10) / 10,
  };
}

// Age Calculator
export function calculateAge(input: AgeInput): AgeOutput {
  const birthDate = new Date(input.birthDate);
  const targetDate = input.targetDate ? new Date(input.targetDate) : new Date();
  
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((targetDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const nextBirthday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < targetDate) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const daysToNextBirthday = Math.floor((nextBirthday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday: daysToNextBirthday,
  };
}

// Tip Calculator
export function calculateTip(input: TipInput): TipOutput {
  const tipAmount = (input.billAmount * input.tipPercentage) / 100;
  const totalAmount = input.billAmount + tipAmount;
  const perPersonAmount = totalAmount / input.splitCount;
  const perPersonTip = tipAmount / input.splitCount;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    perPersonAmount: Math.round(perPersonAmount * 100) / 100,
    perPersonTip: Math.round(perPersonTip * 100) / 100,
  };
}

// Salary/Hourly Converter
export function calculateSalaryHourly(input: SalaryHourlyInput): SalaryHourlyOutput {
  const totalHoursPerYear = input.hoursPerWeek * input.weeksPerYear;
  
  let annualSalary: number;
  let hourlyRate: number;

  if (input.type === 'salary') {
    annualSalary = input.amount;
    hourlyRate = annualSalary / totalHoursPerYear;
  } else {
    hourlyRate = input.amount;
    annualSalary = hourlyRate * totalHoursPerYear;
  }

  const monthlyIncome = annualSalary / 12;
  const weeklyIncome = annualSalary / input.weeksPerYear;

  return {
    annualSalary: Math.round(annualSalary * 100) / 100,
    hourlyRate: Math.round(hourlyRate * 100) / 100,
    monthlyIncome: Math.round(monthlyIncome * 100) / 100,
    weeklyIncome: Math.round(weeklyIncome * 100) / 100,
  };
}

// Loan Calculator
export function calculateLoan(input: LoanInput): LoanOutput {
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanTerm * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = input.loanAmount / numPayments;
  } else {
    monthlyPayment =
      input.loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - input.loanAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
}

// Time Duration Calculator
export function calculateTimeDuration(input: TimeDurationInput): TimeDurationOutput {
  const [startHour, startMin] = input.startTime.split(':').map(Number);
  const [endHour, endMin] = input.endTime.split(':').map(Number);
  
  let startMinutes = startHour * 60 + startMin;
  let endMinutes = endHour * 60 + endMin;

  if (input.includeDate && input.startDate && input.endDate) {
    const startDate = new Date(`${input.startDate}T${input.startTime}`);
    const endDate = new Date(`${input.endDate}T${input.endTime}`);
    const diffMs = endDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      hours,
      minutes,
      totalMinutes,
      totalHours: Math.round((totalMinutes / 60) * 100) / 100,
      formatted: `${hours}h ${minutes}m`,
    };
  }

  // Same day calculation
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours
  }

  const totalMinutes = endMinutes - startMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours,
    minutes,
    totalMinutes,
    totalHours: Math.round((totalMinutes / 60) * 100) / 100,
    formatted: `${hours}h ${minutes}m`,
  };
}

// Tax Calculator
export function calculateTax(input: TaxInput): TaxOutput {
  let beforeTax: number;
  let taxAmount: number;
  let afterTax: number;

  if (input.includeTax) {
    // Amount includes tax, calculate backwards
    afterTax = input.amount;
    beforeTax = afterTax / (1 + input.taxRate / 100);
    taxAmount = afterTax - beforeTax;
  } else {
    // Amount doesn't include tax
    beforeTax = input.amount;
    taxAmount = beforeTax * (input.taxRate / 100);
    afterTax = beforeTax + taxAmount;
  }

  return {
    beforeTax: Math.round(beforeTax * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    afterTax: Math.round(afterTax * 100) / 100,
  };
}

// Inflation Calculator
export function calculateInflation(input: InflationInput): InflationOutput {
  const years = input.endYear - input.startYear;
  const futureValue = input.amount * Math.pow(1 + input.inflationRate / 100, years);
  const totalInflation = ((futureValue - input.amount) / input.amount) * 100;
  const purchasingPowerChange = ((input.amount - futureValue) / futureValue) * 100;

  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalInflation: Math.round(totalInflation * 10) / 10,
    years,
    purchasingPowerChange: Math.round(purchasingPowerChange * 10) / 10,
  };
}

// Savings Calculator
export function calculateSavings(input: SavingsInput): SavingsOutput {
  const monthlyRate = input.interestRate / 100 / 12;
  let currentAmount = input.currentSavings;
  let months = 0;
  let totalContributions = 0;

  // If no interest and no monthly contribution, can't reach goal
  if (monthlyRate === 0 && input.monthlyContribution === 0) {
    return {
      monthsToGoal: Infinity,
      yearsToGoal: Infinity,
      totalContributions: 0,
      totalInterest: 0,
      finalAmount: currentAmount,
    };
  }

  // Calculate months to reach goal with compound interest
  while (currentAmount < input.goalAmount && months < 1200) { // Cap at 100 years
    currentAmount += currentAmount * monthlyRate;
    currentAmount += input.monthlyContribution;
    totalContributions += input.monthlyContribution;
    months++;
  }

  const totalInterest = currentAmount - input.currentSavings - totalContributions;
  const years = months / 12;

  return {
    monthsToGoal: months,
    yearsToGoal: Math.round(years * 10) / 10,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    finalAmount: Math.round(currentAmount * 100) / 100,
  };
}

// Loan Affordability Calculator
export function calculateLoanAffordability(input: LoanAffordabilityInput): LoanAffordabilityOutput {
  const maxMonthlyPayment = input.monthlyIncome * 0.28 - input.monthlyDebts;
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.desiredLoanTerm * 12;
  const maxLoanAmount = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate);
  const debtToIncomeRatio = (input.monthlyDebts / input.monthlyIncome) * 100;

  return {
    maxMonthlyPayment: Math.round(maxMonthlyPayment * 100) / 100,
    maxLoanAmount: Math.round(maxLoanAmount * 100) / 100,
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
    canAfford: maxLoanAmount > 0,
    affordabilityMessage: maxLoanAmount > 0 ? `You can afford up to $${maxLoanAmount.toFixed(2)}` : 'Your debt-to-income ratio is too high',
  };
}

// Rent vs Buy Calculator
export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyOutput {
  const downPayment = input.homePrice * (input.downPaymentPercent / 100);
  const loanAmount = input.homePrice - downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

  let totalRent = 0;
  let currentRent = input.monthlyRent;
  let remainingBalance = loanAmount;
  const monthlyPropertyTax = (input.homePrice * input.propertyTaxRate) / 12 / 100;
  const monthlyInsurance = input.homeInsuranceAnnual / 12;
  const monthlyMaintenance = (input.homePrice * input.maintenancePercent) / 12 / 100;
  let totalInterest = 0;

  for (let month = 0; month < input.years * 12; month++) {
    totalRent += currentRent;
    currentRent *= (1 + input.annualRentIncrease / 100) ** (1 / 12);

    // Calculate interest for this month
    const interestPayment = remainingBalance * monthlyRate;
    totalInterest += interestPayment;
    remainingBalance -= monthlyPayment - interestPayment;
  }

  const homeValue = input.homePrice * Math.pow(1 + input.homeAppreciationRate / 100, input.years);
  const homeEquity = homeValue - Math.max(0, remainingBalance);
  const totalBuyCost = downPayment + monthlyPayment * input.years * 12 + monthlyPropertyTax * input.years * 12 + monthlyInsurance * input.years * 12 + monthlyMaintenance * input.years * 12;

  const netCostDifference = totalRent - (totalBuyCost - homeEquity);

  return {
    totalRentPaid: Math.round(totalRent * 100) / 100,
    totalBuyCost: Math.round(totalBuyCost * 100) / 100,
    homeEquity: Math.round(homeEquity * 100) / 100,
    netCostDifference: Math.round(netCostDifference * 100) / 100,
    recommendation: netCostDifference > 0 ? 'Buying appears to be the better option' : 'Renting appears to be the better option',
    buyMonthlyPayment: Math.round(monthlyPayment * 100) / 100,
    rentMonthlyCost: Math.round(input.monthlyRent * 100) / 100,
  };
}

// Emergency Fund Calculator
export function calculateEmergencyFund(input: EmergencyFundInput): EmergencyFundOutput {
  const recommendedAmount = input.monthlyExpenses * input.monthsOfExpenses;
  return {
    recommendedAmount: Math.round(recommendedAmount * 100) / 100,
  };
}

// Debt-to-Income Ratio Calculator
export function calculateDebtToIncomeRatio(input: DebtToIncomeInput): DebtToIncomeOutput {
  const ratio = input.monthlyDebts / input.monthlyIncome;
  const percentValue = ratio * 100;
  let statusMessage = '';
  
  if (percentValue <= 15) statusMessage = 'Excellent - Very low debt burden';
  else if (percentValue <= 28) statusMessage = 'Good - Healthy debt level';
  else if (percentValue <= 36) statusMessage = 'Fair - Manageable but should monitor';
  else if (percentValue <= 43) statusMessage = 'Poor - High debt burden, consider paying down debt';
  else statusMessage = 'Critical - Consider debt reduction strategies';

  const mortgageAffordability = (input.monthlyIncome * 0.28) - input.monthlyDebts;

  return {
    debtToIncomeRatio: Math.round(ratio * 1000) / 1000,
    percentValue: Math.round(percentValue * 10) / 10,
    statusMessage,
    mortgageAffordability: Math.round(mortgageAffordability * 100) / 100,
  };
}

// TDEE Calculator
export function calculateTDEE(input: TDEEInput): TDEEOutput {
  // Mifflin-St Jeor formula
  let bmr: number;
  const heightCm = input.heightCm;
  const weight = input.weightKg;
  const age = input.age;

  if (input.sex === 'male') {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
  }

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryactive: 1.9,
  };

  const tdee = bmr * activityMultipliers[input.activityLevel];
  const cutCalories = Math.round((tdee - 500) * 10) / 10;
  const bulkCalories = Math.round((tdee + 500) * 10) / 10;

  return {
    bmr: Math.round(bmr * 10) / 10,
    tdee: Math.round(tdee * 10) / 10,
    cutCalories,
    bulkCalories,
  };
}

// Ideal Weight Calculator
export function calculateIdealWeight(input: IdealWeightInput): IdealWeightOutput {
  const heightInches = input.heightCm / 2.54;
  const heightMeters = input.heightCm / 100;
  const bmiLowKg = 18.5 * (heightMeters ** 2);
  const bmiHighKg = 24.9 * (heightMeters ** 2);
  let idealWeightKg: number;

  switch (input.formula) {
    case 'devine':
      idealWeightKg = input.sex === 'male' ? 50 + 2.3 * (heightInches - 60) : 45.5 + 2.3 * (heightInches - 60);
      break;
    case 'robinson':
      idealWeightKg = input.sex === 'male' ? 52 + 1.9 * (heightInches - 60) : 49 + 1.7 * (heightInches - 60);
      break;
    case 'miller':
      idealWeightKg = input.sex === 'male' ? 56.2 + 1.41 * (heightInches - 60) : 53.1 + 1.36 * (heightInches - 60);
      break;
    case 'bmi':
    default:
      idealWeightKg = (bmiLowKg + bmiHighKg) / 2;
      break;
  }

  const safeIdealWeightKg = Math.max(0, idealWeightKg);
  const idealWeightLbs = safeIdealWeightKg / 0.45359237;
  const bmiRangeLowLbs = bmiLowKg / 0.45359237;
  const bmiRangeHighLbs = bmiHighKg / 0.45359237;

  return {
    idealWeightLbs: Math.round(idealWeightLbs * 10) / 10,
    idealWeightKg: Math.round(safeIdealWeightKg * 10) / 10,
    bmiRangeLow: Math.round(bmiRangeLowLbs * 10) / 10,
    bmiRangeHigh: Math.round(bmiRangeHighLbs * 10) / 10,
  };
}

// Water Intake Calculator
export function calculateWaterIntake(input: WaterIntakeInput): WaterIntakeOutput {
  const activityMultipliers: Record<string, number> = {
    sedentary: 0.5,
    light: 0.55,
    moderate: 0.6,
    active: 0.65,
    veryactive: 0.7,
  };

  const baseMultiplier = activityMultipliers[input.activityLevel];
  const liters = input.weightKg * baseMultiplier;
  const ounces = liters * 33.814;
  const cups = liters * 4.227;
  const bottles = liters / 0.5;

  return {
    recommendedLiters: Math.round(liters * 10) / 10,
    recommendedOunces: Math.round(ounces * 10) / 10,
    cupsPerDay: Math.round(cups * 10) / 10,
    bottlesPerDay: Math.round(bottles * 10) / 10,
  };
}

// Protein Intake Calculator
export function calculateProteinIntake(input: ProteinIntakeInput): ProteinIntakeOutput {
  const ratios: Record<string, number> = {
    maintain: 1.6,
    muscle: 2.2,
    loss: 2.4,
  };

  const gramsPerKg = ratios[input.goal];
  const totalGrams = input.weightKg * gramsPerKg;
  const gramsPerMeal = Math.round((totalGrams / 4) * 10) / 10;
  const caloriesFromProtein = totalGrams * 4;

  return {
    gramsPerKg: gramsPerKg,
    totalGrams: Math.round(totalGrams * 10) / 10,
    gramsPerMeal,
    caloriesFromProtein: Math.round(caloriesFromProtein * 10) / 10,
  };
}

// Height Converter
export function convertHeight(input: HeightConvertInput): HeightConvertOutput {
  let inches: number;
  let centimeters: number;

  switch (input.fromUnit) {
    case 'ft':
      inches = input.value * 12;
      centimeters = input.value * 30.48;
      break;
    case 'in':
      inches = input.value;
      centimeters = input.value * 2.54;
      break;
    case 'cm':
      centimeters = input.value;
      inches = input.value / 2.54;
      break;
  }

  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round((inches % 12) * 100) / 100;

  return {
    inches: Math.round(inches * 100) / 100,
    feet,
    centimeters: Math.round(centimeters * 100) / 100,
    formatted: `${feet}'${remainingInches}"`,
  };
}

// Distance Converter
export function convertDistance(input: DistanceConvertInput): DistanceConvertOutput {
  let miles: number;
  let kilometers: number;

  if (input.fromUnit === 'miles') {
    miles = input.value;
    kilometers = input.value * 1.60934;
  } else {
    kilometers = input.value;
    miles = input.value / 1.60934;
  }

  return {
    miles: Math.round(miles * 10000) / 10000,
    kilometers: Math.round(kilometers * 10000) / 10000,
  };
}

// Cooking Converter
export function convertCooking(input: CookingConvertInput): CookingConvertOutput {
  // Rough conversions - can vary by ingredient
  const conversions: Record<string, Record<string, number>> = {
    cups: { grams: 236.6, ml: 236.6, oz: 8 },
    grams: { cups: 0.004227, ml: 1, oz: 0.03527 },
    ml: { cups: 0.004227, grams: 1, oz: 0.03527 },
    oz: { cups: 0.125, grams: 28.35, ml: 28.35 },
  };

  const baseCups = ['cups', 'grams', 'ml', 'oz'].reduce((acc, unit) => {
    if (unit === input.fromUnit) {
      if (input.fromUnit === 'cups') return input.value;
      if (input.fromUnit === 'grams') return input.value / 236.6;
      if (input.fromUnit === 'ml') return input.value / 236.6;
      if (input.fromUnit === 'oz') return input.value / 8;
    }
    return acc;
  }, 0);

  return {
    cups: Math.round(baseCups * 1000) / 1000,
    grams: Math.round(baseCups * 236.6 * 1000) / 1000,
    ml: Math.round(baseCups * 236.6 * 1000) / 1000,
    oz: Math.round(baseCups * 8 * 1000) / 1000,
  };
}

// Power Converter
export function convertPower(input: PowerConvertInput): PowerConvertOutput {
  let watts: number;
  let horsepower: number;

  if (input.fromUnit === 'watts') {
    watts = input.value;
    horsepower = input.value / 745.7;
  } else {
    horsepower = input.value;
    watts = input.value * 745.7;
  }

  return {
    watts: Math.round(watts * 100) / 100,
    horsepower: Math.round(horsepower * 100) / 100,
  };
}

// Cycling Power-to-Weight Calculator
export function calculateCyclingPowerToWeight(input: CyclingPowerToWeightInput): CyclingPowerToWeightOutput {
  const ratio = input.powerWatts / input.weightKg;
  let level = '';
  let category = '';

  if (ratio < 2) {
    level = 'Beginner';
    category = 'Just starting out';
  } else if (ratio < 3) {
    level = 'Recreational';
    category = 'Casual cyclist';
  } else if (ratio < 4) {
    level = 'Intermediate';
    category = 'Active rider';
  } else if (ratio < 5) {
    level = 'Advanced';
    category = 'Competitive cyclist';
  } else if (ratio < 6) {
    level = 'Elite';
    category = 'Professional level';
  } else {
    level = 'Professional';
    category = 'Elite athlete';
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    category,
  };
}

// Tire Pressure Calculator
export function calculateTirePressure(input: TirePressureInput): TirePressureOutput {
  const totalWeight = input.riderWeightKg + input.bikeWeightKg;
  let basePressure: number;

  // Simplified formula based on tire width and total weight
  const frontPressure = (totalWeight * 10) / input.tireWidth;
  const rearPressure = (totalWeight * 10.5) / input.tireWidth;
  
  const avgPressure = (frontPressure + rearPressure) / 2;

  if (input.riderPosition === 'road') {
    basePressure = avgPressure * 0.8;
  } else if (input.riderPosition === 'gravel') {
    basePressure = avgPressure * 0.6;
  } else {
    basePressure = avgPressure * 0.4;
  }

  const recommendedPsi = Math.round(basePressure * 10) / 10;
  const minPsi = Math.round(recommendedPsi * 0.85 * 10) / 10;
  const maxPsi = Math.round(recommendedPsi * 1.15 * 10) / 10;

  return {
    recommendedPsi,
    recommendedBar: Math.round(recommendedPsi / 14.5038 * 100) / 100,
    minPsi,
    maxPsi,
  };
}

// Hiking Pace Calculator
export function calculateHikingPace(input: HikingPaceInput): HikingPaceOutput {
  const distance = input.unit === 'miles' ? input.distance : input.distance / 1.60934;
  
  // Tobler's formula for hiking speed accounting for elevation
  // Simplified: rough calculations for different fitness levels
  const fitnessMultipliers: Record<string, number> = {
    beginner: 0.8,
    intermediate: 1.0,
    advanced: 1.3,
  };

  const baseSpeed = 3; // miles per hour on flat terrain
  const elevationFactor = (input.elevation / 1000) * 0.5; // Rough factor for every 1000 ft
  const adjustedSpeed = (baseSpeed * fitnessMultipliers[input.fitness]) - elevationFactor;
  const safeSpeed = Math.max(adjustedSpeed, 1); // Minimum 1 mph
  
  const timeMinutes = (distance / safeSpeed) * 60;
  const hours = Math.floor(timeMinutes / 60);
  const minutes = Math.round(timeMinutes % 60);

  return {
    timeMinutes: Math.round(timeMinutes),
    timeFormatted: `${hours}h ${minutes}m`,
    paceMph: Math.round(safeSpeed * 10) / 10,
    paceMin: Math.round((60 / safeSpeed) * 10) / 10,
  };
}

// Calories Burned Cycling Calculator
export function calculateCaloriesCycling(input: CaloriesCyclingInput): CaloriesCyclingOutput {
  const intensityMultipliers: Record<string, number> = {
    easy: 6,
    moderate: 10,
    vigorous: 15,
    race: 20,
  };

  const caloriesPerKg = intensityMultipliers[input.intensity];
  const totalCalories = input.weightKg * caloriesPerKg * (input.duration / 60);

  const minutesForBurning: Record<number, number> = {
    100: Math.round((100 / totalCalories) * input.duration),
    250: Math.round((250 / totalCalories) * input.duration),
    500: Math.round((500 / totalCalories) * input.duration),
  };

  return {
    caloriesBurned: Math.round(totalCalories),
    minutesForBurning: Object.fromEntries(
      Object.entries(minutesForBurning).map(([cal, min]) => [cal, Math.round(min)])
    ),
  };
}

// Percentage Increase Calculator
export function calculatePercentageIncrease(input: PercentageIncreaseInput): PercentageIncreaseOutput {
  const increase = input.newValue - input.originalValue;
  const percentIncrease = (increase / input.originalValue) * 100;

  return {
    percentIncrease: Math.round(percentIncrease * 100) / 100,
    increase: Math.round(increase * 100) / 100,
  };
}

// Percentage Decrease Calculator
export function calculatePercentageDecrease(input: PercentageDecreaseInput): PercentageDecreaseOutput {
  const decrease = input.originalValue - input.newValue;
  const percentDecrease = (decrease / input.originalValue) * 100;

  return {
    percentDecrease: Math.round(percentDecrease * 100) / 100,
    decrease: Math.round(decrease * 100) / 100,
  };
}

// Percent Change Calculator
export function calculatePercentChange(input: PercentChangeInput): PercentChangeOutput {
  const change = input.endValue - input.startValue;
  const percentChange = (change / input.startValue) * 100;
  const isIncrease = change >= 0;

  return {
    percentChange: Math.round(Math.abs(percentChange) * 100) / 100,
    change: Math.round(change * 100) / 100,
    isIncrease,
  };
}

// ROI Calculator
export function calculateROI(input: ROIInput): ROIOutput {
  const gain = input.finalValue - input.initialInvestment;
  const roi = gain / input.initialInvestment;
  const roiPercent = (roi * 100).toFixed(2);

  return {
    roi: Math.round(roi * 100) / 100,
    gain: Math.round(gain * 100) / 100,
    roiPercent: roiPercent + '%',
  };
}

// Fuel Efficiency Calculator
export function calculateFuelEfficiency(input: FuelEfficiencyInput): FuelEfficiencyOutput {
  let mpg = 0;
  let kmpl = 0;

  if (input.distanceUnit === 'miles' && input.fuelUnit === 'gallons') {
    mpg = input.distance / input.fuelUsed;
    kmpl = (input.distance * 1.60934) / (input.fuelUsed * 3.78541);
  } else if (input.distanceUnit === 'km' && input.fuelUnit === 'liters') {
    kmpl = input.distance / input.fuelUsed;
    mpg = (input.distance / 1.60934) / (input.fuelUsed / 3.78541);
  } else if (input.distanceUnit === 'miles' && input.fuelUnit === 'liters') {
    mpg = (input.distance * 3.78541) / input.fuelUsed;
    kmpl = input.distance / (input.fuelUsed / 3.78541);
  } else {
    kmpl = (input.distance / 1.60934) / input.fuelUsed;
    mpg = input.distance / (input.fuelUsed * 3.78541);
  }

  const avgGasPricePerGallon = 3.5;
  const costPerMile = (avgGasPricePerGallon / mpg);
  const costPer100km = ((avgGasPricePerGallon * 3.78541) / kmpl) * 100;

  return {
    mpg: Math.round(mpg * 100) / 100,
    kmpl: Math.round(kmpl * 100) / 100,
    costPerMile: Math.round(costPerMile * 100) / 100,
    costPer100km: Math.round(costPer100km * 100) / 100,
  };
}

// Discount Calculator
export function calculateDiscount(input: DiscountInput): DiscountOutput {
  const discountAmount = (input.originalPrice * input.discountPercent) / 100;
  const finalPrice = input.originalPrice - discountAmount;
  const savings = (discountAmount / input.originalPrice * 100).toFixed(1);

  return {
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savings: savings + '% off',
  };
}

// Cost of Living Calculator
export function calculateCostOfLiving(input: CostOfLivingInput): CostOfLivingOutput {
  const monthlyTotal = 
    input.housing + 
    input.food + 
    input.transportation + 
    input.utilities + 
    input.healthcare + 
    input.entertainment + 
    input.other;

  const yearlyTotal = monthlyTotal * 12;

  const categories = [
    { name: 'Housing', amount: input.housing },
    { name: 'Food', amount: input.food },
    { name: 'Transportation', amount: input.transportation },
    { name: 'Utilities', amount: input.utilities },
    { name: 'Healthcare', amount: input.healthcare },
    { name: 'Entertainment', amount: input.entertainment },
    { name: 'Other', amount: input.other },
  ];

  const byCategory = categories.map(cat => ({
    name: cat.name,
    monthly: Math.round(cat.amount * 100) / 100,
    percent: monthlyTotal > 0 ? Math.round((cat.amount / monthlyTotal) * 10000) / 100 : 0,
  }));

  return {
    monthlyTotal: Math.round(monthlyTotal * 100) / 100,
    yearlyTotal: Math.round(yearlyTotal * 100) / 100,
    byCategory,
  };
}

// GPA Calculator
export function calculateGPA(input: GradeInput): GradeOutput {
  if (input.grades.length === 0) {
    return {
      gpa: 0,
      letterGrade: 'N/A',
      description: 'No grades entered',
    };
  }

  const totalWeight = input.grades.reduce((sum, g) => sum + g.weight, 0);
  if (totalWeight === 0) {
    return {
      gpa: 0,
      letterGrade: 'N/A',
      description: 'No weights assigned',
    };
  }

  const weightedSum = input.grades.reduce((sum, g) => sum + g.grade * g.weight, 0);
  const gpa = weightedSum / totalWeight;

  let letterGrade = 'F';
  if (gpa >= 3.7) letterGrade = 'A';
  else if (gpa >= 3.3) letterGrade = 'A-';
  else if (gpa >= 3.0) letterGrade = 'B+';
  else if (gpa >= 2.7) letterGrade = 'B';
  else if (gpa >= 2.3) letterGrade = 'B-';
  else if (gpa >= 2.0) letterGrade = 'C+';
  else if (gpa >= 1.7) letterGrade = 'C';
  else if (gpa >= 1.3) letterGrade = 'C-';
  else if (gpa >= 1.0) letterGrade = 'D';
  else letterGrade = 'F';

  const descriptions: Record<string, string> = {
    'A': 'Excellent',
    'A-': 'Excellent',
    'B+': 'Very Good',
    'B': 'Good',
    'B-': 'Good',
    'C+': 'Satisfactory',
    'C': 'Satisfactory',
    'C-': 'Satisfactory',
    'D': 'Passing',
    'F': 'Failing',
  };

  return {
    gpa: Math.round(gpa * 100) / 100,
    letterGrade,
    description: descriptions[letterGrade] || 'Unknown',
  };
}

