import { describe, it, expect } from 'vitest';
import {
  calculateMortgage,
  convertTemperature,
  calculateCalories,
  calculateBikeGear,
  convertCooking,
} from './calculators';

describe('calculateMortgage', () => {
  it('calculates monthly P&I correctly', () => {
    const result = calculateMortgage({
      homePrice: 300000,
      downPayment: 60000,
      downPaymentType: 'dollar',
      loanTerm: 30,
      interestRate: 6.5,
      propertyTax: 3600,
      homeInsurance: 1200,
      pmi: 200,
    });

    expect(result.loanAmount).toBe(240000);
    expect(Math.round(result.monthlyPI)).toBe(1517);
  });

  it('handles zero interest rate', () => {
    const result = calculateMortgage({
      homePrice: 200000,
      downPayment: 40000,
      downPaymentType: 'dollar',
      loanTerm: 30,
      interestRate: 0,
      propertyTax: 0,
      homeInsurance: 0,
      pmi: 0,
    });

    expect(result.monthlyPI).toBeCloseTo(444.44, 1);
  });
});

describe('convertTemperature', () => {
  it('converts Celsius to Fahrenheit', () => {
    const result = convertTemperature({ value: 0, fromUnit: 'C' });
    expect(result.converted).toBe(32);
    expect(result.toUnit).toBe('F');
  });

  it('converts Fahrenheit to Celsius', () => {
    const result = convertTemperature({ value: 32, fromUnit: 'F' });
    expect(result.converted).toBe(0);
    expect(result.toUnit).toBe('C');
  });

  it('converts with decimal precision', () => {
    const result = convertTemperature({ value: 20, fromUnit: 'C' });
    expect(result.converted).toBe(68);
  });
});

describe('calculateCalories', () => {
  it('calculates BMR for male correctly', () => {
    const result = calculateCalories({
      sex: 'male',
      age: 30,
      heightCm: 178,
      weightKg: 80,
      activityLevel: 'moderate',
      goal: 'maintain',
    });

    expect(result.bmr).toBeGreaterThan(0);
    expect(result.tdee).toBe(Math.round(result.bmr * 1.55));
  });

  it('calculates daily target with deficit for weight loss', () => {
    const result = calculateCalories({
      sex: 'male',
      age: 30,
      heightCm: 178,
      weightKg: 80,
      activityLevel: 'moderate',
      goal: 'lose',
    });

    expect(result.dailyTarget).toBe(result.tdee - 500);
  });
});

describe('calculateBikeGear', () => {
  it('calculates gear inches correctly', () => {
    const result = calculateBikeGear({
      chainring: 32,
      cog: 28,
      wheelDiameter: 29,
      cadence: 80,
    });

    expect(result.gearRatio).toBeCloseTo(1.14, 1);
    expect(result.gearInches).toBe(Math.round((32 / 28) * 29 * 10) / 10);
  });

  it('calculates speed correctly', () => {
    const result = calculateBikeGear({
      chainring: 42,
      cog: 14,
      wheelDiameter: 27.5,
      cadence: 90,
    });

    expect(result.speedMph).toBeGreaterThan(0);
  });
});

describe('convertCooking', () => {
  it('converts 1/4 cup equivalent to tablespoons and teaspoons', () => {
    const result = convertCooking({
      value: 0.25,
      fromUnit: 'cups',
      ingredient: 'all-purpose flour',
    });

    expect(result.tbsp).toBeCloseTo(4, 3);
    expect(result.tsp).toBeCloseTo(12, 3);
  });

  it('converts tablespoons to cups correctly', () => {
    const result = convertCooking({
      value: 8,
      fromUnit: 'tbsp',
      ingredient: 'water',
    });

    expect(result.cups).toBeCloseTo(0.5, 3);
  });
});
