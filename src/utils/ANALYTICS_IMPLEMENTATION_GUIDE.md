/**
 * IMPLEMENTATION GUIDE: Adding GA4 Analytics to Calculators
 * 
 * This guide shows how to add analytics tracking to any calculator component.
 * The Mortgage calculator (src/react-pages/Mortgage/MortgagePage.tsx) is the reference implementation.
 * 
 * There are two approaches:
 * 1. Manual tracking (more control) - Recommended for most calculators
 * 2. Event delegation (simpler, less control) - Good for rapid implementation
 */

// ============================================================================
// APPROACH 1: MANUAL TRACKING (Recommended)
// ============================================================================

/*
STEPS:
1. Import the analytics module at the top of your calculator component
2. Track calculator view in a useEffect on mount
3. Wrap state change handlers to track input changes
4. Track result calculations
5. Track reset actions

EXAMPLE (Minimal):
*/

import { useEffect } from 'react';
import analytics from '../../utils/analytics';

export default function SimpleCalculator() {
  // 1. Track page view on mount
  useEffect(() => {
    analytics.trackCalculatorView('simple-calculator-name');
  }, []);

  // 2. Wrap input handlers with analytics
  const handleInputChange = (value: string) => {
    setState(value);
    analytics.trackInputChange('simple-calculator-name', 'field_name_here');
  };

  // 3. Track when results become available
  useEffect(() => {
    if (result) {
      analytics.trackCalculatorResult('simple-calculator-name');
    }
  }, [result]);

  // 4. Track reset
  const handleReset = () => {
    // ... your reset logic
    analytics.trackCalculatorReset('simple-calculator-name');
  };

  return (
    // ... JSX
  );
}

/*
For every input field in your form, wrap its onChange handler:

BEFORE:
  const [homePrice, setHomePrice] = useState('0');
  <Input value={homePrice} onChange={setHomePrice} />

AFTER:
  const [homePrice, setHomePrice] = useState('0');
  const handleHomePriceChange = (value: string) => {
    setHomePrice(value);
    analytics.trackInputChange('mortgage', 'home_price');
  };
  <Input value={homePrice} onChange={handleHomePriceChange} />
*/

// ============================================================================
// APPROACH 2: EVENT DELEGATION (Simpler, but less flexible)
// ============================================================================

/*
STEPS:
1. Call analytics.enableEventDelegation() on page mount
2. Add data attributes to your HTML:
   - data-calculator-container on the form/input container
   - data-action="calculate" on calculate button
   -data-action="reset" on reset button
   - data-action="copy" on copy button
   - data-field-name on inputs (optional, else uses id or name attribute)

EXAMPLE (Simple):
*/

import { useEffect } from 'react';
import analytics from '../../utils/analytics';

export default function SimpleCalculatorWithDelegation() {
  useEffect(() => {
    // This single call auto-tracks most common patterns
    analytics.enableEventDelegation('simple-calculator');
  }, []);

  return (
    <div data-calculator-container>
      <input 
        type="number" 
        id="home_price"
        placeholder="Home Price"
      />
      <input 
        type="number" 
        id="down_payment"
        placeholder="Down Payment"
      />
      <button data-action="calculate">Calculate</button>
      <button data-action="reset">Reset</button>
      <button data-action="copy">Copy Results</button>
    </div>
  );
}

/*
With event delegation, you get tracking for:
✓ calculator_view (on first load)
✓ calculator_input_change (on field changes)
✓ calculator_submit (on calculate button click)
✓ calculator_reset (on reset button click)
✓ calculator_copy (on copy button click)
✓ outbound_click (on external links)

You lose granular control but gain simplicity.
*/

// ============================================================================
// ADVANCED: Custom Events
// ============================================================================

/*
For custom interactions not covered by the standard methods,
use the generic trackEvent method:
*/

analytics.trackEvent('custom_event_name', {
  calculator_name: 'my-calculator',
  my_custom_param: 'custom_value',
});

/*
Examples:
- Tracking when user toggles a specific mode
- Tracking interactions with charts/visualizations
- Tracking form validation errors
- Tracking when user selects from a dropdown with specific options
*/

// ============================================================================
// CALCULATOR NAME CONVENTIONS
// ============================================================================

/*
Use kebab-case for calculator names:
- mortgage
- budget
- calories
- bike-gear
- weather-converter
- compound-interest
- etc.

These names should match the page URL slug or the component name lowercased.
*/

// ============================================================================
// FIELD NAME CONVENTIONS
// ============================================================================

/*
Use snake_case for field names:
- home_price
- down_payment
- interest_rate
- property_tax
- home_insurance
- etc.

Field names should be descriptive and not contain user data.
Do NOT use the actual user-entered values; just the field name.
*/

// ============================================================================
// TESTING YOUR ANALYTICS
// ============================================================================

/*
1. Enable debug mode via query parameter:
   https://simplecalculators.io/mortgage?ga_debug=1

2. Open browser console (F12) and you'll see:
   [GA4 Analytics] Event: calculator_view {calculator_name: "mortgage"}
   [GA4 Analytics] Event: calculator_input_change {calculator_name: "mortgage", field_name: "home_price"}
   etc.

3. Use Google Analytics DebugView:
   - Go to Analytics dashboard
   - Open DebugView tab
   - Visit your calculator
   - Events appear in real-time

4. Check Network tab in DevTools:
   - Each event sends a POST to www.google-analytics.com/g/collect
   - Right-click the request → Copy as cURL to see the payload
*/

// ============================================================================
// COMMON PATTERNS BY CALCULATOR TYPE
// ============================================================================

/*
FINANCIAL CALCULATORS (mortgage, loan, savings, etc.):
- Track: calculator_view, calculator_input_change, calculator_result, calculator_reset
- Example: mortgage.tsx, auto-loan.tsx, refinance.tsx

CONVERTER/UNIT CALCULATORS (weather, weight, distance, etc.):
- Track: calculator_view, calculator_input_change, calculator_result
- May not have a reset button
- Example: weather-converter.tsx, cooking-converter.tsx

BUDGET/TRACKER CALCULATORS (budget, expense, etc.):
- Track: calculator_view, calculator_input_change, calculator_result
- Track: calculator_submit when "Add" or "Apply" is clicked
- Track: calculator_reset when budget is cleared
- Example: budget.tsx

MULTI-STEP CALCULATORS:
- Track step progression: calculator_submit with method="next", method="prev"
- Or use custom event: trackEvent('step_navigation', {step: 1})
- Example: credit-card-payoff.tsx
*/

// ============================================================================
// PRIVACY CHECKLIST
// ============================================================================

/*
Before tracking any event, ask: "Would this data be considered PII?"

✓ SAFE TO TRACK:
- Field names (home_price, age, weight)
- Calculator names
- Button click types (calculate, reset, copy)
- External links
- User interaction patterns
- Error codes

✗ UNSAFE TO TRACK (DO NOT TRACK):
- Actual values entered (300000, 35, 150)
- Email addresses
- Phone numbers
- Names
- Addresses or locations
- Social security numbers
- Account numbers
- Loan amounts, balances
- Salary or income
- Personal health data (unless anonymized/range-bucketed)

If you need to track values (e.g., "What age range uses this calculator?"),
bucket them into ranges and track the range name, not the value:
  WRONG: analytics.trackEvent('age_selected', {age: 35})
  RIGHT: analytics.trackEvent('age_range_selected', {age_range: '30-40'})

But default to NOT tracking values at all.
*/

export {};
