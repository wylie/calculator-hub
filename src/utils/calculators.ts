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
