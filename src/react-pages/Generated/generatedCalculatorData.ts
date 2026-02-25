export type GeneratedCalculatorCategory = 'income' | 'loans' | 'percentages' | 'health' | 'home' | 'time' | 'outdoors';

export type FieldType = 'number' | 'select' | 'date' | 'datetime-local' | 'time';

export interface CalculatorField {
  key: string;
  label: string;
  type: FieldType;
  defaultValue: string;
  min?: string;
  max?: string;
  step?: string;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
}

export type ResultFormat = 'currency' | 'percent' | 'number' | 'integer' | 'text' | 'duration' | 'date';

export interface CalculatorResult {
  key: string;
  label: string;
  value: number | string;
  format: ResultFormat;
}

export interface CalculatorTable {
  title: string;
  columns: Array<{ key: string; label: string; format: ResultFormat }>;
  rows: Array<Record<string, number | string>>;
}

export interface CalculatorOutput {
  results: CalculatorResult[];
  table?: CalculatorTable;
}

export interface GeneratedCalculatorConfig {
  slug: string;
  title: string;
  description: string;
  category: GeneratedCalculatorCategory;
  icon: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, string>) => CalculatorOutput;
  howItWorks: string[];
  tip: string;
  fact: string;
  note: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedTools: Array<{ path: string; title: string; icon: string }>;
}

const parseNumber = (value: string, fallback = 0): number => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const clamp = (value: number, minValue: number, maxValue: number): number => {
  return Math.max(minValue, Math.min(maxValue, value));
};

const roundTo = (value: number, digits = 2): number => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

const amortizedMonthlyPayment = (principal: number, annualRate: number, months: number): number => {
  if (principal <= 0 || months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate <= 0) return principal / months;
  const factor = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * factor) / (factor - 1);
};

const calculateAmortizationSchedule = (
  principal: number,
  annualRate: number,
  months: number,
  extraPayment = 0
): { payment: number; totalInterest: number; totalPaid: number; schedule: Array<Record<string, number>> } => {
  const payment = amortizedMonthlyPayment(principal, annualRate, months);
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  let totalInterest = 0;
  let totalPaid = 0;
  let period = 0;
  const schedule: Array<Record<string, number>> = [];

  while (balance > 0.01 && period < months + 600) {
    period += 1;
    const interest = monthlyRate > 0 ? balance * monthlyRate : 0;
    let principalPaid = payment - interest + extraPayment;

    if (principalPaid > balance) {
      principalPaid = balance;
    }

    const monthlyPaid = principalPaid + interest;
    balance -= principalPaid;
    totalInterest += interest;
    totalPaid += monthlyPaid;

    schedule.push({
      month: period,
      payment: roundTo(monthlyPaid),
      principal: roundTo(principalPaid),
      interest: roundTo(interest),
      balance: roundTo(Math.max(balance, 0)),
    });

    if (period > months + 5000) break;
  }

  return {
    payment: roundTo(payment),
    totalInterest: roundTo(totalInterest),
    totalPaid: roundTo(totalPaid),
    schedule,
  };
};

const diffDays = (start: Date, end: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.floor((utcEnd - utcStart) / msPerDay);
};

const parseTimeToMinutes = (timeValue: string): number => {
  const [hours, minutes] = timeValue.split(':').map((part) => Number.parseInt(part, 10));
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return 0;
  return hours * 60 + minutes;
};

const formatDurationMinutes = (minutesInput: number): string => {
  const totalMinutes = Math.max(0, Math.round(minutesInput));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const getIsoWeek = (date: Date): { week: number; year: number } => {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return { week, year: target.getUTCFullYear() };
};

const gcd = (a: number, b: number): number => {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
};

const makeStandardContent = (title: string): Pick<GeneratedCalculatorConfig, 'howItWorks' | 'tip' | 'fact' | 'note' | 'faqs'> => ({
  howItWorks: [
    `${title} uses your inputs and standard math formulas to compute the results instantly.`,
    'Edit any field to see updated values right away and compare scenarios.',
    'Use these estimates for planning, then confirm final numbers with your lender, employer, or provider when needed.',
  ],
  tip: 'Try multiple scenarios to compare outcomes before making decisions.',
  fact: 'Small changes in rates, percentages, or timelines can have a large compounding effect.',
  note: 'Results are educational estimates and may differ from official statements.',
  faqs: [
    {
      question: `How accurate is this ${title.toLowerCase()}?`,
      answer: 'It follows standard formulas and provides practical estimates for quick planning.',
    },
    {
      question: 'Can I use this on mobile?',
      answer: 'Yes. The calculator is optimized for mobile, tablet, and desktop use.',
    },
    {
      question: 'Are my values saved?',
      answer: 'Inputs are stored locally in your browser to improve convenience on return visits.',
    },
  ],
});

const CATEGORY_RELATED: Record<GeneratedCalculatorCategory, Array<{ path: string; title: string; icon: string }>> = {
  income: [
    { path: '/salary-hourly', title: 'Salary / Hourly Converter', icon: 'schedule' },
    { path: '/tax', title: 'Tax Calculator', icon: 'receipt_long' },
    { path: '/budget', title: 'Budget Calculator', icon: 'wallet' },
  ],
  loans: [
    { path: '/loan', title: 'Loan Calculator', icon: 'request_quote' },
    { path: '/mortgage', title: 'Mortgage Calculator', icon: 'home' },
    { path: '/refinance', title: 'Refinance Calculator', icon: 'gavel' },
  ],
  percentages: [
    { path: '/percentage', title: 'Percentage Calculator', icon: 'percent' },
    { path: '/percent-change', title: 'Percent Change Calculator', icon: 'compare_arrows' },
    { path: '/discount', title: 'Discount Calculator', icon: 'local_offer' },
  ],
  health: [
    { path: '/calories', title: 'Calorie Calculator', icon: 'nutrition' },
    { path: '/bmi', title: 'BMI Calculator', icon: 'monitor_weight' },
    { path: '/tdee', title: 'TDEE Calculator', icon: 'local_fire_department' },
  ],
  home: [
    { path: '/mortgage', title: 'Mortgage Calculator', icon: 'home' },
    { path: '/down-payment', title: 'Down Payment Calculator', icon: 'attach_money' },
    { path: '/rent-vs-buy', title: 'Rent vs Buy Calculator', icon: 'real_estate_agent' },
  ],
  time: [
    { path: '/time', title: 'Time Converter', icon: 'schedule' },
    { path: '/time-duration', title: 'Time Duration Calculator', icon: 'timer' },
    { path: '/date-difference', title: 'Date Difference Calculator', icon: 'event' },
  ],
  outdoors: [
    { path: '/bike-gear', title: 'Bike Gear Calculator', icon: 'two_wheeler' },
    { path: '/cycling-power-to-weight', title: 'Cycling Power-to-Weight', icon: 'speed' },
    { path: '/hiking-pace', title: 'Hiking Pace Calculator', icon: 'hiking' },
  ],
};

const baseGeneratedCalculators: Omit<GeneratedCalculatorConfig, 'relatedTools' | 'howItWorks' | 'tip' | 'fact' | 'note' | 'faqs'>[] = [
  {
    slug: 'hourly-to-salary',
    title: 'Hourly to Salary Calculator',
    description: 'Convert hourly wage to annual, monthly, and weekly salary estimates.',
    category: 'income',
    icon: 'schedule',
    fields: [
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'number', defaultValue: '25', min: '0', step: '0.01' },
      { key: 'hoursPerWeek', label: 'Hours Per Week', type: 'number', defaultValue: '40', min: '1', step: '0.5' },
      { key: 'weeksPerYear', label: 'Weeks Per Year', type: 'number', defaultValue: '52', min: '1', max: '52', step: '1' },
    ],
    calculate: (values) => {
      const hourlyRate = parseNumber(values.hourlyRate);
      const hoursPerWeek = parseNumber(values.hoursPerWeek, 40);
      const weeksPerYear = parseNumber(values.weeksPerYear, 52);
      const annualSalary = hourlyRate * hoursPerWeek * weeksPerYear;
      return {
        results: [
          { key: 'annualSalary', label: 'Annual Salary', value: roundTo(annualSalary), format: 'currency' },
          { key: 'monthlyIncome', label: 'Monthly Income', value: roundTo(annualSalary / 12), format: 'currency' },
          { key: 'weeklyIncome', label: 'Weekly Income', value: roundTo(annualSalary / weeksPerYear), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'overtime-pay',
    title: 'Overtime Pay Calculator',
    description: 'Estimate regular pay, overtime pay, and total pay for a pay period.',
    category: 'income',
    icon: 'payments',
    fields: [
      { key: 'hourlyRate', label: 'Base Hourly Rate ($)', type: 'number', defaultValue: '22', min: '0', step: '0.01' },
      { key: 'hoursWorked', label: 'Hours Worked', type: 'number', defaultValue: '46', min: '0', step: '0.25' },
      { key: 'regularHours', label: 'Regular Hours Threshold', type: 'number', defaultValue: '40', min: '0', step: '0.25' },
      { key: 'multiplier', label: 'Overtime Multiplier', type: 'number', defaultValue: '1.5', min: '1', step: '0.1' },
    ],
    calculate: (values) => {
      const hourlyRate = parseNumber(values.hourlyRate);
      const hoursWorked = parseNumber(values.hoursWorked);
      const regularHoursThreshold = parseNumber(values.regularHours, 40);
      const multiplier = parseNumber(values.multiplier, 1.5);
      const regularHours = Math.min(hoursWorked, regularHoursThreshold);
      const overtimeHours = Math.max(0, hoursWorked - regularHoursThreshold);
      const regularPay = regularHours * hourlyRate;
      const overtimePay = overtimeHours * hourlyRate * multiplier;
      const totalPay = regularPay + overtimePay;
      const effectiveRate = hoursWorked > 0 ? totalPay / hoursWorked : 0;
      return {
        results: [
          { key: 'regularPay', label: 'Regular Pay', value: roundTo(regularPay), format: 'currency' },
          { key: 'overtimePay', label: 'Overtime Pay', value: roundTo(overtimePay), format: 'currency' },
          { key: 'totalPay', label: 'Total Pay', value: roundTo(totalPay), format: 'currency' },
          { key: 'effectiveRate', label: 'Effective Hourly Rate', value: roundTo(effectiveRate), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'take-home-pay',
    title: 'Take-Home Pay Calculator',
    description: 'Estimate net pay after taxes and deductions for common pay periods.',
    category: 'income',
    icon: 'account_balance_wallet',
    fields: [
      {
        key: 'payPeriod',
        label: 'Pay Period',
        type: 'select',
        defaultValue: 'annual',
        options: [
          { value: 'annual', label: 'Annual' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'biweekly', label: 'Biweekly' },
          { value: 'weekly', label: 'Weekly' },
        ],
      },
      { key: 'grossPay', label: 'Gross Pay ($)', type: 'number', defaultValue: '72000', min: '0', step: '0.01' },
      { key: 'federalTaxRate', label: 'Federal Tax (%)', type: 'number', defaultValue: '12', min: '0', max: '50', step: '0.1' },
      { key: 'stateTaxRate', label: 'State Tax (%)', type: 'number', defaultValue: '5', min: '0', max: '20', step: '0.1' },
      { key: 'ficaRate', label: 'FICA (%)', type: 'number', defaultValue: '7.65', min: '0', max: '20', step: '0.01' },
      { key: 'otherDeductions', label: 'Other Annual Deductions ($)', type: 'number', defaultValue: '3000', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const period = values.payPeriod;
      const grossInput = parseNumber(values.grossPay);
      const annualGross =
        period === 'monthly' ? grossInput * 12 : period === 'biweekly' ? grossInput * 26 : period === 'weekly' ? grossInput * 52 : grossInput;
      const rateTotal = parseNumber(values.federalTaxRate) + parseNumber(values.stateTaxRate) + parseNumber(values.ficaRate);
      const taxAmount = annualGross * (rateTotal / 100);
      const deductions = parseNumber(values.otherDeductions);
      const annualNet = Math.max(0, annualGross - taxAmount - deductions);
      const monthlyNet = annualNet / 12;
      const biweeklyNet = annualNet / 26;
      const weeklyNet = annualNet / 52;
      return {
        results: [
          { key: 'annualNet', label: 'Estimated Annual Take-Home', value: roundTo(annualNet), format: 'currency' },
          { key: 'monthlyNet', label: 'Estimated Monthly Take-Home', value: roundTo(monthlyNet), format: 'currency' },
          { key: 'biweeklyNet', label: 'Estimated Biweekly Take-Home', value: roundTo(biweeklyNet), format: 'currency' },
          { key: 'weeklyNet', label: 'Estimated Weekly Take-Home', value: roundTo(weeklyNet), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'after-tax-salary',
    title: 'After-Tax Salary Calculator',
    description: 'Estimate after-tax income from annual salary and effective tax rate.',
    category: 'income',
    icon: 'receipt_long',
    fields: [
      { key: 'salary', label: 'Gross Annual Salary ($)', type: 'number', defaultValue: '85000', min: '0', step: '0.01' },
      { key: 'taxRate', label: 'Effective Tax Rate (%)', type: 'number', defaultValue: '24', min: '0', max: '60', step: '0.1' },
    ],
    calculate: (values) => {
      const salary = parseNumber(values.salary);
      const taxRate = clamp(parseNumber(values.taxRate), 0, 100);
      const taxes = salary * (taxRate / 100);
      const net = salary - taxes;
      return {
        results: [
          { key: 'netAnnual', label: 'After-Tax Annual Income', value: roundTo(net), format: 'currency' },
          { key: 'netMonthly', label: 'After-Tax Monthly Income', value: roundTo(net / 12), format: 'currency' },
          { key: 'taxes', label: 'Estimated Taxes Paid', value: roundTo(taxes), format: 'currency' },
          { key: 'retention', label: 'Income Kept', value: roundTo(100 - taxRate), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'pay-raise',
    title: 'Pay Raise Calculator',
    description: 'Calculate the value of a raise in annual, monthly, and hourly terms.',
    category: 'income',
    icon: 'trending_up',
    fields: [
      { key: 'currentSalary', label: 'Current Salary ($)', type: 'number', defaultValue: '70000', min: '0', step: '0.01' },
      { key: 'raisePercent', label: 'Raise (%)', type: 'number', defaultValue: '5', min: '0', step: '0.1' },
      { key: 'hoursPerWeek', label: 'Hours Per Week', type: 'number', defaultValue: '40', min: '1', step: '0.5' },
      { key: 'weeksPerYear', label: 'Weeks Per Year', type: 'number', defaultValue: '52', min: '1', max: '52', step: '1' },
    ],
    calculate: (values) => {
      const currentSalary = parseNumber(values.currentSalary);
      const raisePercent = parseNumber(values.raisePercent);
      const hoursPerWeek = parseNumber(values.hoursPerWeek, 40);
      const weeksPerYear = parseNumber(values.weeksPerYear, 52);
      const raiseAmount = currentSalary * (raisePercent / 100);
      const newSalary = currentSalary + raiseAmount;
      const hourlyIncrease = hoursPerWeek * weeksPerYear > 0 ? raiseAmount / (hoursPerWeek * weeksPerYear) : 0;
      return {
        results: [
          { key: 'raiseAmount', label: 'Annual Raise Amount', value: roundTo(raiseAmount), format: 'currency' },
          { key: 'newSalary', label: 'New Annual Salary', value: roundTo(newSalary), format: 'currency' },
          { key: 'monthlyIncrease', label: 'Monthly Increase', value: roundTo(raiseAmount / 12), format: 'currency' },
          { key: 'hourlyIncrease', label: 'Hourly Increase', value: roundTo(hourlyIncrease), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'annual-income',
    title: 'Annual Income Calculator',
    description: 'Estimate annual income from pay rate, schedule, and extra earnings.',
    category: 'income',
    icon: 'calendar_month',
    fields: [
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'number', defaultValue: '30', min: '0', step: '0.01' },
      { key: 'hoursPerWeek', label: 'Hours Per Week', type: 'number', defaultValue: '40', min: '0', step: '0.5' },
      { key: 'weeksPerYear', label: 'Weeks Per Year', type: 'number', defaultValue: '50', min: '1', max: '52', step: '1' },
      { key: 'bonus', label: 'Annual Bonus ($)', type: 'number', defaultValue: '4000', min: '0', step: '0.01' },
      { key: 'otherIncome', label: 'Other Annual Income ($)', type: 'number', defaultValue: '1200', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const hourlyRate = parseNumber(values.hourlyRate);
      const hoursPerWeek = parseNumber(values.hoursPerWeek);
      const weeksPerYear = parseNumber(values.weeksPerYear, 50);
      const baseAnnual = hourlyRate * hoursPerWeek * weeksPerYear;
      const totalAnnual = baseAnnual + parseNumber(values.bonus) + parseNumber(values.otherIncome);
      return {
        results: [
          { key: 'baseAnnual', label: 'Base Annual Income', value: roundTo(baseAnnual), format: 'currency' },
          { key: 'totalAnnual', label: 'Total Annual Income', value: roundTo(totalAnnual), format: 'currency' },
          { key: 'monthlyAverage', label: 'Average Monthly Income', value: roundTo(totalAnnual / 12), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'biweekly-pay',
    title: 'Biweekly Pay Calculator',
    description: 'Convert salary to biweekly pay and estimate take-home per paycheck.',
    category: 'income',
    icon: 'event_repeat',
    fields: [
      { key: 'annualSalary', label: 'Annual Salary ($)', type: 'number', defaultValue: '78000', min: '0', step: '0.01' },
      { key: 'taxRate', label: 'Total Tax Rate (%)', type: 'number', defaultValue: '22', min: '0', max: '60', step: '0.1' },
      { key: 'deductions', label: 'Other Deductions Per Check ($)', type: 'number', defaultValue: '75', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const annualSalary = parseNumber(values.annualSalary);
      const grossBiweekly = annualSalary / 26;
      const taxes = grossBiweekly * (parseNumber(values.taxRate) / 100);
      const netBiweekly = Math.max(0, grossBiweekly - taxes - parseNumber(values.deductions));
      return {
        results: [
          { key: 'grossBiweekly', label: 'Gross Biweekly Pay', value: roundTo(grossBiweekly), format: 'currency' },
          { key: 'netBiweekly', label: 'Estimated Net Biweekly Pay', value: roundTo(netBiweekly), format: 'currency' },
          { key: 'monthlyNet', label: 'Estimated Monthly Net Pay', value: roundTo(netBiweekly * 26 / 12), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'monthly-income',
    title: 'Monthly Income Calculator',
    description: 'Estimate gross and net monthly income from annual earnings.',
    category: 'income',
    icon: 'calendar_view_month',
    fields: [
      { key: 'annualSalary', label: 'Annual Salary ($)', type: 'number', defaultValue: '84000', min: '0', step: '0.01' },
      { key: 'bonus', label: 'Annual Bonus ($)', type: 'number', defaultValue: '6000', min: '0', step: '0.01' },
      { key: 'taxRate', label: 'Effective Tax Rate (%)', type: 'number', defaultValue: '23', min: '0', max: '60', step: '0.1' },
    ],
    calculate: (values) => {
      const annualGross = parseNumber(values.annualSalary) + parseNumber(values.bonus);
      const monthlyGross = annualGross / 12;
      const monthlyNet = monthlyGross * (1 - parseNumber(values.taxRate) / 100);
      return {
        results: [
          { key: 'monthlyGross', label: 'Gross Monthly Income', value: roundTo(monthlyGross), format: 'currency' },
          { key: 'monthlyNet', label: 'Estimated Net Monthly Income', value: roundTo(monthlyNet), format: 'currency' },
          { key: 'annualGross', label: 'Gross Annual Income', value: roundTo(annualGross), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'self-employment-tax',
    title: 'Self-Employment Tax Calculator',
    description: 'Estimate self-employment tax and deductible half for planning.',
    category: 'income',
    icon: 'work',
    fields: [
      { key: 'netEarnings', label: 'Net Self-Employment Earnings ($)', type: 'number', defaultValue: '90000', min: '0', step: '0.01' },
      { key: 'seTaxRate', label: 'Self-Employment Tax Rate (%)', type: 'number', defaultValue: '15.3', min: '0', max: '30', step: '0.01' },
    ],
    calculate: (values) => {
      const netEarnings = parseNumber(values.netEarnings);
      const seTax = netEarnings * (parseNumber(values.seTaxRate, 15.3) / 100);
      const deductibleHalf = seTax / 2;
      return {
        results: [
          { key: 'seTax', label: 'Estimated Self-Employment Tax', value: roundTo(seTax), format: 'currency' },
          { key: 'deductibleHalf', label: 'Deductible Half of SE Tax', value: roundTo(deductibleHalf), format: 'currency' },
          { key: 'effectiveRate', label: 'Effective SE Tax Rate', value: roundTo(parseNumber(values.seTaxRate)), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: '1099-vs-w2',
    title: '1099 vs W2 Calculator',
    description: 'Compare estimated net income between contractor and employee scenarios.',
    category: 'income',
    icon: 'compare',
    fields: [
      { key: 'income', label: 'Annual Gross Income ($)', type: 'number', defaultValue: '100000', min: '0', step: '0.01' },
      { key: 'w2TaxRate', label: 'W2 Effective Tax Rate (%)', type: 'number', defaultValue: '24', min: '0', max: '60', step: '0.1' },
      { key: 'contractorTaxRate', label: '1099 Effective Tax Rate (%)', type: 'number', defaultValue: '31', min: '0', max: '70', step: '0.1' },
      { key: 'benefitsValue', label: 'Employer Benefits Value ($)', type: 'number', defaultValue: '12000', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const income = parseNumber(values.income);
      const w2Net = income * (1 - parseNumber(values.w2TaxRate) / 100) + parseNumber(values.benefitsValue);
      const contractorNet = income * (1 - parseNumber(values.contractorTaxRate) / 100);
      const difference = w2Net - contractorNet;
      return {
        results: [
          { key: 'w2Net', label: 'Estimated W2 Net + Benefits', value: roundTo(w2Net), format: 'currency' },
          { key: 'contractorNet', label: 'Estimated 1099 Net', value: roundTo(contractorNet), format: 'currency' },
          { key: 'difference', label: 'W2 Advantage (positive) / 1099 Advantage (negative)', value: roundTo(difference), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'personal-loan',
    title: 'Personal Loan Calculator',
    description: 'Estimate monthly payment, total interest, and total cost for a personal loan.',
    category: 'loans',
    icon: 'request_quote',
    fields: [
      { key: 'amount', label: 'Loan Amount ($)', type: 'number', defaultValue: '15000', min: '0', step: '0.01' },
      { key: 'apr', label: 'APR (%)', type: 'number', defaultValue: '11.5', min: '0', step: '0.01' },
      { key: 'years', label: 'Term (years)', type: 'number', defaultValue: '5', min: '1', step: '1' },
    ],
    calculate: (values) => {
      const amount = parseNumber(values.amount);
      const apr = parseNumber(values.apr);
      const months = parseNumber(values.years, 5) * 12;
      const payment = amortizedMonthlyPayment(amount, apr, months);
      const totalPaid = payment * months;
      return {
        results: [
          { key: 'payment', label: 'Monthly Payment', value: roundTo(payment), format: 'currency' },
          { key: 'totalInterest', label: 'Total Interest', value: roundTo(totalPaid - amount), format: 'currency' },
          { key: 'totalPaid', label: 'Total Paid', value: roundTo(totalPaid), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'student-loan',
    title: 'Student Loan Calculator',
    description: 'Estimate student loan payment timeline with optional extra monthly payment.',
    category: 'loans',
    icon: 'school',
    fields: [
      { key: 'amount', label: 'Loan Balance ($)', type: 'number', defaultValue: '35000', min: '0', step: '0.01' },
      { key: 'apr', label: 'APR (%)', type: 'number', defaultValue: '6.2', min: '0', step: '0.01' },
      { key: 'years', label: 'Term (years)', type: 'number', defaultValue: '10', min: '1', step: '1' },
      { key: 'extra', label: 'Extra Monthly Payment ($)', type: 'number', defaultValue: '50', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const amount = parseNumber(values.amount);
      const apr = parseNumber(values.apr);
      const months = parseNumber(values.years, 10) * 12;
      const extra = parseNumber(values.extra);
      const schedule = calculateAmortizationSchedule(amount, apr, months, extra);
      return {
        results: [
          { key: 'payment', label: 'Base Monthly Payment', value: schedule.payment, format: 'currency' },
          { key: 'monthsToPayoff', label: 'Estimated Months to Payoff', value: schedule.schedule.length, format: 'integer' },
          { key: 'totalInterest', label: 'Total Interest', value: schedule.totalInterest, format: 'currency' },
          { key: 'totalPaid', label: 'Total Paid', value: schedule.totalPaid, format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'debt-snowball',
    title: 'Debt Snowball Calculator',
    description: 'Estimate debt payoff timeline using a snowball-style accelerated payment amount.',
    category: 'loans',
    icon: 'snowing',
    fields: [
      { key: 'totalDebt', label: 'Total Debt ($)', type: 'number', defaultValue: '22000', min: '0', step: '0.01' },
      { key: 'avgApr', label: 'Average APR (%)', type: 'number', defaultValue: '18', min: '0', step: '0.01' },
      { key: 'monthlyPayment', label: 'Monthly Payment Budget ($)', type: 'number', defaultValue: '700', min: '1', step: '0.01' },
    ],
    calculate: (values) => {
      const debt = parseNumber(values.totalDebt);
      const apr = parseNumber(values.avgApr);
      const payment = parseNumber(values.monthlyPayment, 1);
      const monthlyRate = apr / 100 / 12;
      if (debt <= 0 || payment <= debt * monthlyRate) {
        return {
          results: [
            { key: 'months', label: 'Months to Payoff', value: 0, format: 'integer' },
            { key: 'interest', label: 'Estimated Interest Paid', value: 0, format: 'currency' },
            { key: 'warning', label: 'Status', value: 'Payment too low to reduce balance', format: 'text' },
          ],
        };
      }

      let balance = debt;
      let months = 0;
      let interestPaid = 0;
      while (balance > 0.01 && months < 1200) {
        const interest = balance * monthlyRate;
        const principal = Math.max(0, payment - interest);
        balance -= principal;
        interestPaid += interest;
        months += 1;
      }

      return {
        results: [
          { key: 'months', label: 'Estimated Months to Payoff', value: months, format: 'integer' },
          { key: 'interest', label: 'Estimated Interest Paid', value: roundTo(interestPaid), format: 'currency' },
          { key: 'years', label: 'Estimated Years to Payoff', value: roundTo(months / 12), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'debt-avalanche',
    title: 'Debt Avalanche Calculator',
    description: 'Estimate debt payoff timeline prioritizing highest APR balances first.',
    category: 'loans',
    icon: 'landslide',
    fields: [
      { key: 'totalDebt', label: 'Total Debt ($)', type: 'number', defaultValue: '22000', min: '0', step: '0.01' },
      { key: 'avgApr', label: 'Average APR (%)', type: 'number', defaultValue: '18', min: '0', step: '0.01' },
      { key: 'monthlyPayment', label: 'Monthly Payment Budget ($)', type: 'number', defaultValue: '700', min: '1', step: '0.01' },
      { key: 'avalancheSavingsBoost', label: 'Avalanche Efficiency Boost (%)', type: 'number', defaultValue: '4', min: '0', max: '25', step: '0.1' },
    ],
    calculate: (values) => {
      const debt = parseNumber(values.totalDebt);
      const apr = parseNumber(values.avgApr);
      const payment = parseNumber(values.monthlyPayment, 1);
      const boost = parseNumber(values.avalancheSavingsBoost) / 100;
      const effectiveApr = Math.max(0, apr * (1 - boost));
      const monthlyRate = effectiveApr / 100 / 12;

      if (debt <= 0 || payment <= debt * monthlyRate) {
        return {
          results: [
            { key: 'months', label: 'Months to Payoff', value: 0, format: 'integer' },
            { key: 'interest', label: 'Estimated Interest Paid', value: 0, format: 'currency' },
            { key: 'warning', label: 'Status', value: 'Payment too low to reduce balance', format: 'text' },
          ],
        };
      }

      let balance = debt;
      let months = 0;
      let interestPaid = 0;
      while (balance > 0.01 && months < 1200) {
        const interest = balance * monthlyRate;
        const principal = Math.max(0, payment - interest);
        balance -= principal;
        interestPaid += interest;
        months += 1;
      }

      return {
        results: [
          { key: 'months', label: 'Estimated Months to Payoff', value: months, format: 'integer' },
          { key: 'interest', label: 'Estimated Interest Paid', value: roundTo(interestPaid), format: 'currency' },
          { key: 'effectiveApr', label: 'Effective APR Used', value: roundTo(effectiveApr), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'heloc',
    title: 'HELOC Calculator',
    description: 'Estimate payment during interest-only and repayment phases of a HELOC.',
    category: 'loans',
    icon: 'home_work',
    fields: [
      { key: 'creditLine', label: 'Credit Line ($)', type: 'number', defaultValue: '100000', min: '0', step: '0.01' },
      { key: 'balance', label: 'Current Balance ($)', type: 'number', defaultValue: '55000', min: '0', step: '0.01' },
      { key: 'apr', label: 'APR (%)', type: 'number', defaultValue: '8.5', min: '0', step: '0.01' },
      { key: 'interestOnlyYears', label: 'Interest-Only Period (years)', type: 'number', defaultValue: '10', min: '1', step: '1' },
      { key: 'repaymentYears', label: 'Repayment Period (years)', type: 'number', defaultValue: '20', min: '1', step: '1' },
    ],
    calculate: (values) => {
      const creditLine = parseNumber(values.creditLine);
      const balance = Math.min(parseNumber(values.balance), creditLine);
      const apr = parseNumber(values.apr);
      const monthlyRate = apr / 100 / 12;
      const interestOnlyPayment = balance * monthlyRate;
      const repaymentMonths = parseNumber(values.repaymentYears, 20) * 12;
      const repaymentPayment = amortizedMonthlyPayment(balance, apr, repaymentMonths);
      return {
        results: [
          { key: 'utilization', label: 'Credit Line Utilization', value: creditLine > 0 ? roundTo((balance / creditLine) * 100) : 0, format: 'percent' },
          { key: 'interestOnly', label: 'Interest-Only Monthly Payment', value: roundTo(interestOnlyPayment), format: 'currency' },
          { key: 'repayment', label: 'Repayment Monthly Payment', value: roundTo(repaymentPayment), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'amortization-calculator',
    title: 'Amortization Calculator',
    description: 'View full amortization schedule with payment, principal, interest, and balance by month.',
    category: 'loans',
    icon: 'table_chart',
    fields: [
      { key: 'amount', label: 'Loan Amount ($)', type: 'number', defaultValue: '300000', min: '0', step: '0.01' },
      { key: 'apr', label: 'APR (%)', type: 'number', defaultValue: '6.5', min: '0', step: '0.01' },
      { key: 'years', label: 'Term (years)', type: 'number', defaultValue: '30', min: '1', step: '1' },
      { key: 'extra', label: 'Extra Monthly Payment ($)', type: 'number', defaultValue: '0', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const amount = parseNumber(values.amount);
      const apr = parseNumber(values.apr);
      const months = parseNumber(values.years, 30) * 12;
      const extra = parseNumber(values.extra);
      const scheduleData = calculateAmortizationSchedule(amount, apr, months, extra);

      const rows = scheduleData.schedule.map((row) => ({
        month: row.month,
        payment: row.payment,
        principal: row.principal,
        interest: row.interest,
        balance: row.balance,
      }));

      return {
        results: [
          { key: 'payment', label: 'Base Monthly Payment', value: scheduleData.payment, format: 'currency' },
          { key: 'payoffMonths', label: 'Payoff Length (months)', value: scheduleData.schedule.length, format: 'integer' },
          { key: 'totalInterest', label: 'Total Interest', value: scheduleData.totalInterest, format: 'currency' },
          { key: 'totalPaid', label: 'Total Paid', value: scheduleData.totalPaid, format: 'currency' },
        ],
        table: {
          title: 'Full Amortization Schedule',
          columns: [
            { key: 'month', label: 'Month', format: 'integer' },
            { key: 'payment', label: 'Payment', format: 'currency' },
            { key: 'principal', label: 'Principal', format: 'currency' },
            { key: 'interest', label: 'Interest', format: 'currency' },
            { key: 'balance', label: 'Balance', format: 'currency' },
          ],
          rows,
        },
      };
    },
  },
  {
    slug: 'loan-payment-calculator',
    title: 'Loan Payment Calculator',
    description: 'Estimate monthly loan payment, total interest, and total repayment.',
    category: 'loans',
    icon: 'payments',
    fields: [
      { key: 'amount', label: 'Loan Amount ($)', type: 'number', defaultValue: '25000', min: '0', step: '0.01' },
      { key: 'apr', label: 'APR (%)', type: 'number', defaultValue: '7.2', min: '0', step: '0.01' },
      { key: 'months', label: 'Term (months)', type: 'number', defaultValue: '60', min: '1', step: '1' },
    ],
    calculate: (values) => {
      const amount = parseNumber(values.amount);
      const apr = parseNumber(values.apr);
      const months = parseNumber(values.months, 60);
      const payment = amortizedMonthlyPayment(amount, apr, months);
      const totalPaid = payment * months;
      return {
        results: [
          { key: 'payment', label: 'Monthly Payment', value: roundTo(payment), format: 'currency' },
          { key: 'totalInterest', label: 'Total Interest', value: roundTo(totalPaid - amount), format: 'currency' },
          { key: 'totalPaid', label: 'Total Paid', value: roundTo(totalPaid), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'percentage-of-a-number',
    title: 'Percentage of a Number Calculator',
    description: 'Find a percentage value of any number instantly.',
    category: 'percentages',
    icon: 'percent',
    fields: [
      { key: 'percent', label: 'Percentage (%)', type: 'number', defaultValue: '15', step: '0.01' },
      { key: 'number', label: 'Number', type: 'number', defaultValue: '240', step: '0.01' },
    ],
    calculate: (values) => {
      const percent = parseNumber(values.percent);
      const number = parseNumber(values.number);
      return {
        results: [
          { key: 'result', label: `${percent}% of ${number}`, value: roundTo((percent / 100) * number), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'what-percent-of-x-is-y',
    title: 'What Percent of X is Y Calculator',
    description: 'Calculate what percentage one value is of another value.',
    category: 'percentages',
    icon: 'help',
    fields: [
      { key: 'x', label: 'X (base value)', type: 'number', defaultValue: '500', step: '0.01' },
      { key: 'y', label: 'Y (part value)', type: 'number', defaultValue: '125', step: '0.01' },
    ],
    calculate: (values) => {
      const x = parseNumber(values.x);
      const y = parseNumber(values.y);
      const percent = x !== 0 ? (y / x) * 100 : 0;
      return {
        results: [
          { key: 'percent', label: 'Y as a Percentage of X', value: roundTo(percent), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'fraction-to-percent',
    title: 'Fraction to Percent Calculator',
    description: 'Convert a fraction to a percentage value.',
    category: 'percentages',
    icon: 'function',
    fields: [
      { key: 'numerator', label: 'Numerator', type: 'number', defaultValue: '3', step: '1' },
      { key: 'denominator', label: 'Denominator', type: 'number', defaultValue: '8', step: '1' },
    ],
    calculate: (values) => {
      const numerator = parseNumber(values.numerator);
      const denominator = parseNumber(values.denominator, 1);
      const percent = denominator !== 0 ? (numerator / denominator) * 100 : 0;
      return {
        results: [
          { key: 'percent', label: 'Percent', value: roundTo(percent), format: 'percent' },
          { key: 'decimal', label: 'Decimal Value', value: denominator !== 0 ? roundTo(numerator / denominator, 4) : 0, format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'percent-to-fraction',
    title: 'Percent to Fraction Calculator',
    description: 'Convert percent values into simplified fractions.',
    category: 'percentages',
    icon: 'exposure',
    fields: [
      { key: 'percent', label: 'Percent (%)', type: 'number', defaultValue: '37.5', step: '0.01' },
    ],
    calculate: (values) => {
      const percent = parseNumber(values.percent);
      const scaledNumerator = Math.round(percent * 100);
      const scaledDenominator = 10000;
      const divisor = gcd(scaledNumerator, scaledDenominator);
      const numerator = scaledNumerator / divisor;
      const denominator = scaledDenominator / divisor;
      return {
        results: [
          { key: 'fraction', label: 'Simplified Fraction', value: `${numerator}/${denominator}`, format: 'text' },
          { key: 'decimal', label: 'Decimal', value: roundTo(percent / 100, 4), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'margin-calculator',
    title: 'Margin Calculator',
    description: 'Calculate gross margin and markup from revenue and cost.',
    category: 'percentages',
    icon: 'bar_chart',
    fields: [
      { key: 'revenue', label: 'Revenue / Selling Price ($)', type: 'number', defaultValue: '120', min: '0', step: '0.01' },
      { key: 'cost', label: 'Cost ($)', type: 'number', defaultValue: '72', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const revenue = parseNumber(values.revenue);
      const cost = parseNumber(values.cost);
      const profit = revenue - cost;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      const markup = cost > 0 ? (profit / cost) * 100 : 0;
      return {
        results: [
          { key: 'profit', label: 'Gross Profit', value: roundTo(profit), format: 'currency' },
          { key: 'margin', label: 'Gross Margin', value: roundTo(margin), format: 'percent' },
          { key: 'markup', label: 'Markup', value: roundTo(markup), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'markup-calculator',
    title: 'Markup Calculator',
    description: 'Calculate selling price and margin from cost and markup percentage.',
    category: 'percentages',
    icon: 'sell',
    fields: [
      { key: 'cost', label: 'Cost ($)', type: 'number', defaultValue: '50', min: '0', step: '0.01' },
      { key: 'markupPercent', label: 'Markup (%)', type: 'number', defaultValue: '40', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const cost = parseNumber(values.cost);
      const markupPercent = parseNumber(values.markupPercent);
      const sellingPrice = cost * (1 + markupPercent / 100);
      const margin = sellingPrice > 0 ? ((sellingPrice - cost) / sellingPrice) * 100 : 0;
      return {
        results: [
          { key: 'sellingPrice', label: 'Selling Price', value: roundTo(sellingPrice), format: 'currency' },
          { key: 'profit', label: 'Profit', value: roundTo(sellingPrice - cost), format: 'currency' },
          { key: 'margin', label: 'Margin', value: roundTo(margin), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'body-fat',
    title: 'Body Fat Calculator',
    description: 'Estimate body fat percentage using circumference-based formulas.',
    category: 'health',
    icon: 'monitor_weight',
    fields: [
      {
        key: 'sex',
        label: 'Sex',
        type: 'select',
        defaultValue: 'male',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ],
      },
      { key: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: '175', min: '1', step: '0.1' },
      { key: 'neckCm', label: 'Neck Circumference (cm)', type: 'number', defaultValue: '39', min: '1', step: '0.1' },
      { key: 'waistCm', label: 'Waist Circumference (cm)', type: 'number', defaultValue: '88', min: '1', step: '0.1' },
      { key: 'hipCm', label: 'Hip Circumference (cm, female)', type: 'number', defaultValue: '98', min: '1', step: '0.1' },
    ],
    calculate: (values) => {
      const sex = values.sex;
      const heightCm = parseNumber(values.heightCm, 1);
      const neckCm = parseNumber(values.neckCm, 1);
      const waistCm = parseNumber(values.waistCm, 1);
      const hipCm = parseNumber(values.hipCm, 1);

      const heightIn = heightCm / 2.54;
      const neckIn = neckCm / 2.54;
      const waistIn = waistCm / 2.54;
      const hipIn = hipCm / 2.54;

      const bodyFat = sex === 'female'
        ? 163.205 * Math.log10(Math.max(waistIn + hipIn - neckIn, 1)) - 97.684 * Math.log10(Math.max(heightIn, 1)) - 78.387
        : 86.01 * Math.log10(Math.max(waistIn - neckIn, 1)) - 70.041 * Math.log10(Math.max(heightIn, 1)) + 36.76;

      const clampedBodyFat = clamp(bodyFat, 2, 70);
      return {
        results: [
          { key: 'bodyFat', label: 'Estimated Body Fat', value: roundTo(clampedBodyFat), format: 'percent' },
          { key: 'leanMassPercent', label: 'Estimated Lean Mass', value: roundTo(100 - clampedBodyFat), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'lean-body-mass',
    title: 'Lean Body Mass Calculator',
    description: 'Calculate lean body mass using weight and body fat percentage.',
    category: 'health',
    icon: 'fitness_center',
    fields: [
      { key: 'weightKg', label: 'Body Weight (kg)', type: 'number', defaultValue: '78', min: '1', step: '0.1' },
      { key: 'bodyFatPercent', label: 'Body Fat (%)', type: 'number', defaultValue: '20', min: '0', max: '70', step: '0.1' },
    ],
    calculate: (values) => {
      const weightKg = parseNumber(values.weightKg);
      const bodyFatPercent = clamp(parseNumber(values.bodyFatPercent), 0, 100);
      const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
      return {
        results: [
          { key: 'leanKg', label: 'Lean Body Mass (kg)', value: roundTo(leanMassKg), format: 'number' },
          { key: 'leanLb', label: 'Lean Body Mass (lb)', value: roundTo(leanMassKg * 2.20462), format: 'number' },
          { key: 'fatMassKg', label: 'Fat Mass (kg)', value: roundTo(weightKg - leanMassKg), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'macro-calculator',
    title: 'Macro Calculator',
    description: 'Estimate daily macros (protein, carbs, fats) from calories and goals.',
    category: 'health',
    icon: 'nutrition',
    fields: [
      { key: 'dailyCalories', label: 'Daily Calories', type: 'number', defaultValue: '2400', min: '0', step: '1' },
      { key: 'bodyWeightLb', label: 'Body Weight (lb)', type: 'number', defaultValue: '170', min: '1', step: '0.1' },
      { key: 'proteinPerLb', label: 'Protein (g per lb)', type: 'number', defaultValue: '0.8', min: '0.2', step: '0.1' },
      { key: 'fatPercentCalories', label: 'Fat (% of calories)', type: 'number', defaultValue: '30', min: '10', max: '60', step: '1' },
    ],
    calculate: (values) => {
      const calories = parseNumber(values.dailyCalories);
      const bodyWeightLb = parseNumber(values.bodyWeightLb);
      const proteinPerLb = parseNumber(values.proteinPerLb);
      const fatPercentCalories = clamp(parseNumber(values.fatPercentCalories), 0, 100);
      const proteinGrams = bodyWeightLb * proteinPerLb;
      const proteinCalories = proteinGrams * 4;
      const fatCalories = calories * (fatPercentCalories / 100);
      const fatGrams = fatCalories / 9;
      const carbCalories = Math.max(0, calories - proteinCalories - fatCalories);
      const carbGrams = carbCalories / 4;
      return {
        results: [
          { key: 'protein', label: 'Protein (g/day)', value: roundTo(proteinGrams), format: 'number' },
          { key: 'fat', label: 'Fat (g/day)', value: roundTo(fatGrams), format: 'number' },
          { key: 'carbs', label: 'Carbs (g/day)', value: roundTo(carbGrams), format: 'number' },
          { key: 'calories', label: 'Total Calories', value: roundTo(calories), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'calories-burned',
    title: 'Calories Burned Calculator',
    description: 'Estimate calories burned from MET value, weight, and workout duration.',
    category: 'health',
    icon: 'local_fire_department',
    fields: [
      { key: 'met', label: 'MET Value', type: 'number', defaultValue: '8', min: '1', step: '0.1' },
      { key: 'weightKg', label: 'Weight (kg)', type: 'number', defaultValue: '75', min: '1', step: '0.1' },
      { key: 'minutes', label: 'Duration (minutes)', type: 'number', defaultValue: '45', min: '1', step: '1' },
    ],
    calculate: (values) => {
      const met = parseNumber(values.met);
      const weightKg = parseNumber(values.weightKg);
      const minutes = parseNumber(values.minutes);
      const calories = met * weightKg * (minutes / 60);
      return {
        results: [
          { key: 'calories', label: 'Estimated Calories Burned', value: roundTo(calories), format: 'number' },
          { key: 'perHour', label: 'Estimated Calories per Hour', value: roundTo(met * weightKg), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'one-rep-max',
    title: 'One Rep Max Calculator',
    description: 'Estimate one-rep max (1RM) from weight lifted and reps completed.',
    category: 'health',
    icon: 'sports_gymnastics',
    fields: [
      { key: 'weight', label: 'Weight Lifted', type: 'number', defaultValue: '185', min: '1', step: '0.1' },
      { key: 'reps', label: 'Repetitions', type: 'number', defaultValue: '5', min: '1', max: '20', step: '1' },
    ],
    calculate: (values) => {
      const weight = parseNumber(values.weight);
      const reps = clamp(parseNumber(values.reps, 1), 1, 20);
      const oneRepMax = weight * (1 + reps / 30);
      return {
        results: [
          { key: 'oneRepMax', label: 'Estimated 1RM', value: roundTo(oneRepMax), format: 'number' },
          { key: 'ninetyPercent', label: '90% Training Load', value: roundTo(oneRepMax * 0.9), format: 'number' },
          { key: 'eightyPercent', label: '80% Training Load', value: roundTo(oneRepMax * 0.8), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'target-heart-rate',
    title: 'Target Heart Rate Calculator',
    description: 'Calculate target heart rate zone using age, resting HR, and intensity range.',
    category: 'health',
    icon: 'favorite',
    fields: [
      { key: 'age', label: 'Age', type: 'number', defaultValue: '35', min: '1', max: '100', step: '1' },
      { key: 'restingHr', label: 'Resting Heart Rate (bpm)', type: 'number', defaultValue: '62', min: '30', max: '120', step: '1' },
      { key: 'lowIntensity', label: 'Low Intensity (%)', type: 'number', defaultValue: '60', min: '40', max: '95', step: '1' },
      { key: 'highIntensity', label: 'High Intensity (%)', type: 'number', defaultValue: '80', min: '40', max: '95', step: '1' },
    ],
    calculate: (values) => {
      const age = parseNumber(values.age);
      const restingHr = parseNumber(values.restingHr);
      const low = parseNumber(values.lowIntensity) / 100;
      const high = parseNumber(values.highIntensity) / 100;
      const maxHr = 220 - age;
      const reserve = maxHr - restingHr;
      const lowTarget = restingHr + reserve * low;
      const highTarget = restingHr + reserve * high;
      return {
        results: [
          { key: 'maxHr', label: 'Estimated Max Heart Rate', value: roundTo(maxHr), format: 'integer' },
          { key: 'targetLow', label: 'Target Zone Low', value: roundTo(lowTarget), format: 'integer' },
          { key: 'targetHigh', label: 'Target Zone High', value: roundTo(highTarget), format: 'integer' },
        ],
      };
    },
  },
  {
    slug: 'property-tax',
    title: 'Property Tax Calculator',
    description: 'Estimate annual and monthly property taxes from home value and tax rate.',
    category: 'home',
    icon: 'holiday_village',
    fields: [
      { key: 'homeValue', label: 'Home Value ($)', type: 'number', defaultValue: '450000', min: '0', step: '0.01' },
      { key: 'taxRate', label: 'Property Tax Rate (%)', type: 'number', defaultValue: '1.2', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const homeValue = parseNumber(values.homeValue);
      const taxRate = parseNumber(values.taxRate);
      const annualTax = homeValue * (taxRate / 100);
      return {
        results: [
          { key: 'annualTax', label: 'Estimated Annual Property Tax', value: roundTo(annualTax), format: 'currency' },
          { key: 'monthlyTax', label: 'Estimated Monthly Property Tax', value: roundTo(annualTax / 12), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'closing-cost',
    title: 'Closing Cost Calculator',
    description: 'Estimate total home closing costs using percentage and fixed-fee assumptions.',
    category: 'home',
    icon: 'real_estate_agent',
    fields: [
      { key: 'homePrice', label: 'Home Price ($)', type: 'number', defaultValue: '400000', min: '0', step: '0.01' },
      { key: 'closingRate', label: 'Closing Costs (%)', type: 'number', defaultValue: '3', min: '0', step: '0.1' },
      { key: 'fixedFees', label: 'Additional Fixed Fees ($)', type: 'number', defaultValue: '1500', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const homePrice = parseNumber(values.homePrice);
      const closingRate = parseNumber(values.closingRate);
      const fixedFees = parseNumber(values.fixedFees);
      const variableCosts = homePrice * (closingRate / 100);
      const totalClosing = variableCosts + fixedFees;
      return {
        results: [
          { key: 'variableCosts', label: 'Percentage-Based Costs', value: roundTo(variableCosts), format: 'currency' },
          { key: 'totalClosing', label: 'Estimated Total Closing Costs', value: roundTo(totalClosing), format: 'currency' },
          { key: 'cashNeeded', label: 'Estimated Cash Needed (incl. closing)', value: roundTo(homePrice + totalClosing), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'pmi',
    title: 'PMI Calculator',
    description: 'Estimate private mortgage insurance based on LTV and annual PMI rate.',
    category: 'home',
    icon: 'shield',
    fields: [
      { key: 'homePrice', label: 'Home Price ($)', type: 'number', defaultValue: '350000', min: '0', step: '0.01' },
      { key: 'downPercent', label: 'Down Payment (%)', type: 'number', defaultValue: '10', min: '0', max: '100', step: '0.1' },
      { key: 'annualPmiRate', label: 'Annual PMI Rate (%)', type: 'number', defaultValue: '0.7', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const homePrice = parseNumber(values.homePrice);
      const downPercent = clamp(parseNumber(values.downPercent), 0, 100);
      const annualPmiRate = parseNumber(values.annualPmiRate);
      const loanAmount = homePrice * (1 - downPercent / 100);
      const ltv = homePrice > 0 ? (loanAmount / homePrice) * 100 : 0;
      const annualPmi = ltv > 80 ? loanAmount * (annualPmiRate / 100) : 0;
      return {
        results: [
          { key: 'ltv', label: 'Loan-to-Value (LTV)', value: roundTo(ltv), format: 'percent' },
          { key: 'annualPmi', label: 'Estimated Annual PMI', value: roundTo(annualPmi), format: 'currency' },
          { key: 'monthlyPmi', label: 'Estimated Monthly PMI', value: roundTo(annualPmi / 12), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'home-equity',
    title: 'Home Equity Calculator',
    description: 'Estimate home equity and equity percentage from value and mortgage balance.',
    category: 'home',
    icon: 'home',
    fields: [
      { key: 'homeValue', label: 'Current Home Value ($)', type: 'number', defaultValue: '500000', min: '0', step: '0.01' },
      { key: 'loanBalance', label: 'Mortgage Balance ($)', type: 'number', defaultValue: '310000', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const homeValue = parseNumber(values.homeValue);
      const loanBalance = parseNumber(values.loanBalance);
      const equity = homeValue - loanBalance;
      const equityPercent = homeValue > 0 ? (equity / homeValue) * 100 : 0;
      return {
        results: [
          { key: 'equity', label: 'Estimated Home Equity', value: roundTo(equity), format: 'currency' },
          { key: 'equityPercent', label: 'Equity Percentage', value: roundTo(equityPercent), format: 'percent' },
          { key: 'ltv', label: 'Loan-to-Value', value: roundTo(100 - equityPercent), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'rent-increase',
    title: 'Rent Increase Calculator',
    description: 'Calculate the impact of rent increases in monthly and annual terms.',
    category: 'home',
    icon: 'apartment',
    fields: [
      { key: 'currentRent', label: 'Current Monthly Rent ($)', type: 'number', defaultValue: '1800', min: '0', step: '0.01' },
      { key: 'increasePercent', label: 'Increase (%)', type: 'number', defaultValue: '6', min: '0', step: '0.1' },
    ],
    calculate: (values) => {
      const currentRent = parseNumber(values.currentRent);
      const increasePercent = parseNumber(values.increasePercent);
      const increaseAmount = currentRent * (increasePercent / 100);
      const newRent = currentRent + increaseAmount;
      return {
        results: [
          { key: 'increaseAmount', label: 'Monthly Increase', value: roundTo(increaseAmount), format: 'currency' },
          { key: 'newRent', label: 'New Monthly Rent', value: roundTo(newRent), format: 'currency' },
          { key: 'annualImpact', label: 'Annual Cost Increase', value: roundTo(increaseAmount * 12), format: 'currency' },
        ],
      };
    },
  },
  {
    slug: 'rental-yield',
    title: 'Rental Yield Calculator',
    description: 'Estimate gross and net rental yield for investment property analysis.',
    category: 'home',
    icon: 'home_work',
    fields: [
      { key: 'monthlyRent', label: 'Monthly Rent ($)', type: 'number', defaultValue: '2400', min: '0', step: '0.01' },
      { key: 'propertyValue', label: 'Property Value ($)', type: 'number', defaultValue: '420000', min: '0', step: '0.01' },
      { key: 'annualExpenses', label: 'Annual Expenses ($)', type: 'number', defaultValue: '7000', min: '0', step: '0.01' },
    ],
    calculate: (values) => {
      const monthlyRent = parseNumber(values.monthlyRent);
      const propertyValue = parseNumber(values.propertyValue);
      const annualExpenses = parseNumber(values.annualExpenses);
      const annualRent = monthlyRent * 12;
      const grossYield = propertyValue > 0 ? (annualRent / propertyValue) * 100 : 0;
      const netYield = propertyValue > 0 ? ((annualRent - annualExpenses) / propertyValue) * 100 : 0;
      return {
        results: [
          { key: 'annualRent', label: 'Annual Rental Income', value: roundTo(annualRent), format: 'currency' },
          { key: 'grossYield', label: 'Gross Yield', value: roundTo(grossYield), format: 'percent' },
          { key: 'netYield', label: 'Net Yield', value: roundTo(netYield), format: 'percent' },
        ],
      };
    },
  },
  {
    slug: 'work-hours',
    title: 'Work Hours Calculator',
    description: 'Calculate daily and weekly work hours from start/end times and breaks.',
    category: 'time',
    icon: 'work_history',
    fields: [
      { key: 'startTime', label: 'Start Time', type: 'time', defaultValue: '09:00' },
      { key: 'endTime', label: 'End Time', type: 'time', defaultValue: '17:30' },
      { key: 'breakMinutes', label: 'Break (minutes)', type: 'number', defaultValue: '30', min: '0', step: '1' },
      { key: 'daysPerWeek', label: 'Days Per Week', type: 'number', defaultValue: '5', min: '1', max: '7', step: '1' },
    ],
    calculate: (values) => {
      const startMinutes = parseTimeToMinutes(values.startTime);
      const endMinutes = parseTimeToMinutes(values.endTime);
      const rawMinutes = endMinutes >= startMinutes ? endMinutes - startMinutes : (24 * 60 - startMinutes + endMinutes);
      const netMinutes = Math.max(0, rawMinutes - parseNumber(values.breakMinutes));
      const daysPerWeek = parseNumber(values.daysPerWeek, 5);
      return {
        results: [
          { key: 'dailyHours', label: 'Daily Work Duration', value: formatDurationMinutes(netMinutes), format: 'duration' },
          { key: 'weeklyHours', label: 'Weekly Work Duration', value: formatDurationMinutes(netMinutes * daysPerWeek), format: 'duration' },
          { key: 'weeklyDecimal', label: 'Weekly Hours (decimal)', value: roundTo((netMinutes * daysPerWeek) / 60, 2), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'business-days',
    title: 'Business Days Calculator',
    description: 'Count business days between two dates, excluding weekends.',
    category: 'time',
    icon: 'calendar_today',
    fields: [
      { key: 'startDate', label: 'Start Date', type: 'date', defaultValue: '2026-01-01' },
      { key: 'endDate', label: 'End Date', type: 'date', defaultValue: '2026-02-25' },
    ],
    calculate: (values) => {
      const start = new Date(values.startDate);
      const end = new Date(values.endDate);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
        return {
          results: [
            { key: 'businessDays', label: 'Business Days', value: 0, format: 'integer' },
            { key: 'calendarDays', label: 'Calendar Days', value: 0, format: 'integer' },
          ],
        };
      }
      const calendarDays = diffDays(start, end) + 1;
      let businessDays = 0;
      for (let i = 0; i < calendarDays; i += 1) {
        const current = new Date(start);
        current.setDate(start.getDate() + i);
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
          businessDays += 1;
        }
      }
      return {
        results: [
          { key: 'businessDays', label: 'Business Days', value: businessDays, format: 'integer' },
          { key: 'calendarDays', label: 'Calendar Days', value: calendarDays, format: 'integer' },
        ],
      };
    },
  },
  {
    slug: 'countdown',
    title: 'Countdown Calculator',
    description: 'Calculate remaining time until a target date and time.',
    category: 'time',
    icon: 'timer',
    fields: [
      { key: 'targetDateTime', label: 'Target Date & Time', type: 'datetime-local', defaultValue: '2026-12-31T23:59' },
    ],
    calculate: (values) => {
      const target = new Date(values.targetDateTime);
      if (Number.isNaN(target.getTime())) {
        return {
          results: [
            { key: 'remaining', label: 'Time Remaining', value: 'Invalid target date', format: 'text' },
          ],
        };
      }
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();
      const absDiffMs = Math.abs(diffMs);
      const totalMinutes = Math.floor(absDiffMs / 60000);
      const days = Math.floor(totalMinutes / (24 * 60));
      const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
      const minutes = totalMinutes % 60;
      return {
        results: [
          { key: 'status', label: 'Status', value: diffMs >= 0 ? 'Time remaining' : 'Target has passed', format: 'text' },
          { key: 'remaining', label: 'Days / Hours / Minutes', value: `${days}d ${hours}h ${minutes}m`, format: 'duration' },
          { key: 'targetDate', label: 'Target Date', value: target.toLocaleString(), format: 'date' },
        ],
      };
    },
  },
  {
    slug: 'week-number',
    title: 'Week Number Calculator',
    description: 'Find ISO week number and week year for any date.',
    category: 'time',
    icon: 'view_week',
    fields: [
      { key: 'date', label: 'Date', type: 'date', defaultValue: '2026-02-25' },
    ],
    calculate: (values) => {
      const date = new Date(values.date);
      if (Number.isNaN(date.getTime())) {
        return {
          results: [
            { key: 'week', label: 'ISO Week Number', value: 0, format: 'integer' },
            { key: 'weekYear', label: 'ISO Week Year', value: 0, format: 'integer' },
          ],
        };
      }
      const iso = getIsoWeek(date);
      return {
        results: [
          { key: 'week', label: 'ISO Week Number', value: iso.week, format: 'integer' },
          { key: 'weekYear', label: 'ISO Week Year', value: iso.year, format: 'integer' },
          { key: 'weekday', label: 'Weekday', value: date.toLocaleDateString(undefined, { weekday: 'long' }), format: 'text' },
        ],
      };
    },
  },
  {
    slug: 'time-zone-converter',
    title: 'Time Zone Converter',
    description: 'Convert a date/time between UTC offsets.',
    category: 'time',
    icon: 'public',
    fields: [
      { key: 'dateTime', label: 'Date & Time', type: 'datetime-local', defaultValue: '2026-02-25T12:00' },
      { key: 'fromOffset', label: 'From UTC Offset (hours)', type: 'number', defaultValue: '-5', min: '-12', max: '14', step: '0.5' },
      { key: 'toOffset', label: 'To UTC Offset (hours)', type: 'number', defaultValue: '1', min: '-12', max: '14', step: '0.5' },
    ],
    calculate: (values) => {
      const input = values.dateTime;
      const fromOffset = parseNumber(values.fromOffset);
      const toOffset = parseNumber(values.toOffset);
      const parsedLocal = new Date(input);
      if (Number.isNaN(parsedLocal.getTime())) {
        return {
          results: [
            { key: 'converted', label: 'Converted Date/Time', value: 'Invalid input date/time', format: 'text' },
          ],
        };
      }

      const utcMs = parsedLocal.getTime() - fromOffset * 3600000;
      const converted = new Date(utcMs + toOffset * 3600000);

      return {
        results: [
          { key: 'converted', label: 'Converted Date/Time', value: converted.toLocaleString(), format: 'date' },
          { key: 'offsetShift', label: 'Offset Shift', value: `${roundTo(toOffset - fromOffset)} hours`, format: 'text' },
        ],
      };
    },
  },
  {
    slug: 'climbing-grade-converter',
    title: 'Climbing Grade Converter',
    description: 'Convert selected YDS sport climbing grades to approximate French grades.',
    category: 'outdoors',
    icon: 'landscape',
    fields: [
      {
        key: 'yds',
        label: 'YDS Grade',
        type: 'select',
        defaultValue: '5.10a',
        options: [
          { value: '5.8', label: '5.8' },
          { value: '5.9', label: '5.9' },
          { value: '5.10a', label: '5.10a' },
          { value: '5.10d', label: '5.10d' },
          { value: '5.11b', label: '5.11b' },
          { value: '5.12a', label: '5.12a' },
          { value: '5.12d', label: '5.12d' },
          { value: '5.13b', label: '5.13b' },
        ],
      },
    ],
    calculate: (values) => {
      const map: Record<string, string> = {
        '5.8': '5b',
        '5.9': '5c',
        '5.10a': '6a',
        '5.10d': '6b+',
        '5.11b': '6c',
        '5.12a': '7a+',
        '5.12d': '7c',
        '5.13b': '8a',
      };
      const french = map[values.yds] ?? 'N/A';
      return {
        results: [
          { key: 'yds', label: 'YDS Grade', value: values.yds, format: 'text' },
          { key: 'french', label: 'Approx. French Grade', value: french, format: 'text' },
        ],
      };
    },
  },
  {
    slug: 'trail-elevation-gain',
    title: 'Trail Elevation Gain Calculator',
    description: 'Estimate average grade and climbing rate from trail distance and elevation gain.',
    category: 'outdoors',
    icon: 'terrain',
    fields: [
      { key: 'distanceMiles', label: 'Trail Distance (miles)', type: 'number', defaultValue: '6.5', min: '0', step: '0.1' },
      { key: 'elevationGainFt', label: 'Elevation Gain (ft)', type: 'number', defaultValue: '1800', min: '0', step: '1' },
      { key: 'hours', label: 'Moving Time (hours)', type: 'number', defaultValue: '3.2', min: '0.1', step: '0.1' },
    ],
    calculate: (values) => {
      const distanceMiles = parseNumber(values.distanceMiles);
      const elevationGainFt = parseNumber(values.elevationGainFt);
      const hours = parseNumber(values.hours, 1);
      const horizontalFeet = distanceMiles * 5280;
      const gradePercent = horizontalFeet > 0 ? (elevationGainFt / horizontalFeet) * 100 : 0;
      const verticalSpeed = elevationGainFt / hours;
      return {
        results: [
          { key: 'gradePercent', label: 'Average Grade', value: roundTo(gradePercent), format: 'percent' },
          { key: 'verticalSpeed', label: 'Vertical Speed (ft/hr)', value: roundTo(verticalSpeed), format: 'number' },
          { key: 'gainPerMile', label: 'Elevation Gain per Mile (ft)', value: distanceMiles > 0 ? roundTo(elevationGainFt / distanceMiles) : 0, format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'pace-per-mile',
    title: 'Pace Per Mile Calculator',
    description: 'Calculate running pace per mile and per kilometer from distance and time.',
    category: 'outdoors',
    icon: 'directions_run',
    fields: [
      { key: 'distanceMiles', label: 'Distance (miles)', type: 'number', defaultValue: '5', min: '0.01', step: '0.01' },
      { key: 'hours', label: 'Hours', type: 'number', defaultValue: '0', min: '0', step: '1' },
      { key: 'minutes', label: 'Minutes', type: 'number', defaultValue: '42', min: '0', step: '1' },
      { key: 'seconds', label: 'Seconds', type: 'number', defaultValue: '30', min: '0', step: '1' },
    ],
    calculate: (values) => {
      const distanceMiles = parseNumber(values.distanceMiles, 1);
      const totalMinutes = parseNumber(values.hours) * 60 + parseNumber(values.minutes) + parseNumber(values.seconds) / 60;
      const pacePerMileMinutes = distanceMiles > 0 ? totalMinutes / distanceMiles : 0;
      const distanceKm = distanceMiles * 1.60934;
      const pacePerKmMinutes = distanceKm > 0 ? totalMinutes / distanceKm : 0;
      const mph = totalMinutes > 0 ? distanceMiles / (totalMinutes / 60) : 0;
      return {
        results: [
          { key: 'paceMile', label: 'Pace per Mile', value: formatDurationMinutes(pacePerMileMinutes), format: 'duration' },
          { key: 'paceKm', label: 'Pace per Kilometer', value: formatDurationMinutes(pacePerKmMinutes), format: 'duration' },
          { key: 'speed', label: 'Average Speed (mph)', value: roundTo(mph), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'cycling-ftp',
    title: 'Cycling FTP Calculator',
    description: 'Estimate Functional Threshold Power from a 20-minute power test.',
    category: 'outdoors',
    icon: 'directions_bike',
    fields: [
      { key: 'power20Min', label: '20-Minute Average Power (watts)', type: 'number', defaultValue: '260', min: '1', step: '1' },
      { key: 'weightKg', label: 'Rider Weight (kg)', type: 'number', defaultValue: '72', min: '1', step: '0.1' },
    ],
    calculate: (values) => {
      const power20Min = parseNumber(values.power20Min);
      const weightKg = parseNumber(values.weightKg, 1);
      const ftp = power20Min * 0.95;
      const wPerKg = ftp / weightKg;
      return {
        results: [
          { key: 'ftp', label: 'Estimated FTP', value: roundTo(ftp), format: 'number' },
          { key: 'wkg', label: 'FTP W/kg', value: roundTo(wPerKg, 2), format: 'number' },
          { key: 'z2Lower', label: 'Endurance Zone Lower (W)', value: roundTo(ftp * 0.56), format: 'number' },
          { key: 'z2Upper', label: 'Endurance Zone Upper (W)', value: roundTo(ftp * 0.75), format: 'number' },
        ],
      };
    },
  },
  {
    slug: 'vo2-max',
    title: 'VO2 Max Calculator',
    description: 'Estimate VO2 max using resting and maximum heart rate values.',
    category: 'outdoors',
    icon: 'monitor_heart',
    fields: [
      { key: 'restingHr', label: 'Resting Heart Rate (bpm)', type: 'number', defaultValue: '58', min: '30', max: '120', step: '1' },
      { key: 'maxHr', label: 'Maximum Heart Rate (bpm)', type: 'number', defaultValue: '186', min: '80', max: '230', step: '1' },
    ],
    calculate: (values) => {
      const restingHr = parseNumber(values.restingHr, 60);
      const maxHr = parseNumber(values.maxHr, 180);
      const vo2 = restingHr > 0 ? 15.3 * (maxHr / restingHr) : 0;
      return {
        results: [
          { key: 'vo2', label: 'Estimated VO2 Max (ml/kg/min)', value: roundTo(vo2, 1), format: 'number' },
          { key: 'hrRatio', label: 'Max/Resting HR Ratio', value: roundTo(maxHr / restingHr, 2), format: 'number' },
        ],
      };
    },
  },
];

const withContentAndRelated = (config: Omit<GeneratedCalculatorConfig, 'relatedTools' | 'howItWorks' | 'tip' | 'fact' | 'note' | 'faqs'>): GeneratedCalculatorConfig => {
  const defaultContent = makeStandardContent(config.title);
  const related = CATEGORY_RELATED[config.category];
  return {
    ...config,
    ...defaultContent,
    relatedTools: related,
  };
};

export const generatedCalculators: GeneratedCalculatorConfig[] = baseGeneratedCalculators.map(withContentAndRelated);

export const generatedCalculatorBySlug: Record<string, GeneratedCalculatorConfig> = generatedCalculators.reduce<Record<string, GeneratedCalculatorConfig>>((acc, calculator) => {
  acc[calculator.slug] = calculator;
  return acc;
}, {});
