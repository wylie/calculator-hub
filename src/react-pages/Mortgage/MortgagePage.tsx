import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import AdSlot from '../../components/AdSlot';
import AffiliateBox from '../../components/AffiliateBox';
import RelatedTools from '../../components/RelatedTools';
import { calculateMortgage } from '../../utils/calculators';
import { formatCurrency } from '../../utils/formatting';

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useStickyState('mortgage-home-price', '300000');
  const [downPayment, setDownPayment] = useStickyState('mortgage-down-payment', '60000');
  const [downPaymentIsDollar, setDownPaymentIsDollar] = useStickyState('mortgage-down-payment-dollar', true);
  const [loanTerm, setLoanTerm] = useStickyState('mortgage-loan-term', '30');
  const [interestRate, setInterestRate] = useStickyState('mortgage-interest-rate', '6.5');
  const [propertyTax, setPropertyTax] = useStickyState('mortgage-property-tax', '3600');
  const [homeInsurance, setHomeInsurance] = useStickyState('mortgage-home-insurance', '1200');
  const [pmi, setPmi] = useStickyState('mortgage-pmi', '0');

  const result = calculateMortgage({
    homePrice: parseFloat(homePrice) || 0,
    downPayment: parseFloat(downPayment) || 0,
    downPaymentType: downPaymentIsDollar ? 'dollar' : 'percent',
    loanTerm: parseFloat(loanTerm) || 0,
    interestRate: parseFloat(interestRate) || 0,
    propertyTax: parseFloat(propertyTax) || 0,
    homeInsurance: parseFloat(homeInsurance) || 0,
    pmi: parseFloat(pmi) || 0,
  });

  const handleReset = () => {
    setHomePrice('300000');
    setDownPayment('60000');
    setDownPaymentIsDollar(true);
    setLoanTerm('30');
    setInterestRate('6.5');
    setPropertyTax('3600');
    setHomeInsurance('1200');
    setPmi('0');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Mortgage Calculator</h2>
      <p className="text-slate-600 mb-6">
        Calculate your monthly mortgage payment and see the total interest paid over the life of the loan.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Loan Details</h3>

            <Input
              label="Home Price ($)"
              value={homePrice}
              onChange={setHomePrice}
              type="number"
              min="0"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Down Payment
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  min="0"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setDownPaymentIsDollar(!downPaymentIsDollar)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-300"
                >
                  {downPaymentIsDollar ? '$' : '%'}
                </button>
              </div>
            </div>

            <Select
              label="Loan Term (years)"
              value={loanTerm}
              onChange={setLoanTerm}
              options={[
                { value: '15', label: '15 years' },
                { value: '20', label: '20 years' },
                { value: '30', label: '30 years' },
              ]}
            />

            <Input
              label="Interest Rate (APR %)"
              value={interestRate}
              onChange={setInterestRate}
              type="number"
              min="0"
              step="0.1"
            />

            <h3 className="text-lg font-semibold text-slate-900 my-4">Optional Costs</h3>

            <Input
              label="Annual Property Tax ($)"
              value={propertyTax}
              onChange={setPropertyTax}
              type="number"
              min="0"
            />

            <Input
              label="Annual Home Insurance ($)"
              value={homeInsurance}
              onChange={setHomeInsurance}
              type="number"
              min="0"
            />

            <Input
              label="Monthly PMI ($)"
              value={pmi}
              onChange={setPmi}
              type="number"
              min="0"
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
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Results</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600">Monthly P&I</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.monthlyPI)}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">Monthly Total</p>
                <p className="text-xl font-bold text-slate-900">
                  {formatCurrency(result.monthlyTotal)}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">Loan Amount</p>
                <p className="text-sm font-semibold text-slate-900">
                  {formatCurrency(result.loanAmount)}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">Total Interest</p>
                <p className="text-sm font-semibold text-slate-900">
                  {formatCurrency(result.totalInterest)}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">First Month</p>
                <p className="text-xs text-slate-700">
                  Interest: {formatCurrency(result.firstMonthInterest)}
                </p>
                <p className="text-xs text-slate-700">
                  Principal: {formatCurrency(result.firstMonthPrincipal)}
                </p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>

      <AffiliateBox
        title="Mortgage Reference Guide"
        description="Learn about mortgage programs, terminology, and best practices."
        buttonText="View Book"
        href="https://www.amazon.com/Mortgage-Encyclopedia-Authoritative-Programs-Practices/dp/0071739580?crid=3ANA7CMIUQ9UO&dib=eyJ2IjoiMSJ9.uhGlj2DRediHhbZQm-nDUX4oakeWyysKfpV76RoqUdyIyqN3cM0VoBFy9DNwAHa86ZefeYTJvNvDzWBZSlvnlRfwUjnrBMnrBcXV0BeEG_F8UhujZ52rFZv8vp_pgyxf2kmbkK9_tcy64Cj7m4Co4vyy4avPtGNg-XYCj-IoGxzapufM2weGmd8KT8c9xGN0CO7odTu38YvWhEOCq218g3qQdj0WyYDmc0hExhvApc8.d8Pibtgntm32ytdcIWItPRzH1Aa0J3eVQuxvFHZMSA0&dib_tag=se&keywords=mortgage+books&qid=1771211090&sprefix=mortgage+books%2Caps%2C293&sr=8-3&linkCode=ll2&tag=simplecalcula-20&linkId=ae487e4a199e4d85e168aa648cbd2951&language=en_US&ref_=as_li_ss_tl"
        iconName="compare_arrows"
      />

      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">How this mortgage calculator works</h3>
        <p className="text-sm text-slate-700 mb-3">
          This tool uses a standard amortization approach to estimate monthly principal and interest. It then adds
          optional monthly costs for property tax, home insurance, and PMI to show your total estimated monthly payment.
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          <li>Loan amount = home price minus down payment</li>
          <li>Monthly P&amp;I is based on APR and loan term</li>
          <li>Monthly total includes optional tax, insurance, and PMI</li>
        </ul>
        <p className="text-xs text-slate-500 mt-4">Last updated: February 2026</p>
      </Card>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Mortgage calculator FAQ</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">How is monthly mortgage payment calculated?</summary>
            <p className="mt-2">Monthly principal and interest are calculated using the loan amount, APR, and term. Optional costs are added after that.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">Does this include taxes and insurance?</summary>
            <p className="mt-2">Yes. Enter annual property tax and insurance to include them as monthly amounts in the total estimate.</p>
          </details>
          <details className="rounded border border-slate-200 p-3 bg-white">
            <summary className="font-medium cursor-pointer">Can I use percent or dollar down payment?</summary>
            <p className="mt-2">Yes. Use the toggle beside the down-payment input to switch between $ and % modes.</p>
          </details>
        </div>
      </Card>

      <RelatedTools
        tools={[
          { path: '/refinance', title: 'Refinance Calculator', icon: 'build' },
          { path: '/down-payment', title: 'Down Payment Calculator', icon: 'trending_down' },
          { path: '/auto-loan', title: 'Auto Loan Calculator', icon: 'directions_car' },
          { path: '/credit-card-payoff', title: 'Credit Card Payoff', icon: 'credit_card' },
        ]}
      />
    </div>
  );
}
