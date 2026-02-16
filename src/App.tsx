import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/Home/HomePage'
import MortgagePage from './pages/Mortgage/MortgagePage'
import BudgetPage from './pages/Budget/BudgetPage'
import WeatherPage from './pages/Weather/WeatherPage'
import CaloriesPage from './pages/Calories/CaloriesPage'
import BikeGearPage from './pages/BikeGear/BikeGearPage'
import WeightPage from './pages/Weight/WeightPage'
import LengthPage from './pages/Length/LengthPage'
import SpeedPage from './pages/Speed/SpeedPage'
import VolumePage from './pages/Volume/VolumePage'
import AreaPage from './pages/Area/AreaPage'
import TimePage from './pages/Time/TimePage'
import FileSizePage from './pages/FileSize/FileSizePage'
import PercentagePage from './pages/Percentage/PercentagePage'
import DateDifferencePage from './pages/DateDifference/DateDifferencePage'
import InterestPage from './pages/Interest/InterestPage'
import CompoundInterestPage from './pages/CompoundInterest/CompoundInterestPage'
import AutoLoanPage from './pages/AutoLoan/AutoLoanPage'
import CreditCardPayoffPage from './pages/CreditCardPayoff/CreditCardPayoffPage'
import RetirementPage from './pages/Retirement/RetirementPage'
import InvestmentGrowthPage from './pages/InvestmentGrowth/InvestmentGrowthPage'
import RefinancePage from './pages/Refinance/RefinancePage'
import DownPaymentPage from './pages/DownPayment/DownPaymentPage'
import NetWorthPage from './pages/NetWorth/NetWorthPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mortgage" element={<MortgagePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/weight" element={<WeightPage />} />
        <Route path="/length" element={<LengthPage />} />
        <Route path="/speed" element={<SpeedPage />} />
        <Route path="/volume" element={<VolumePage />} />
        <Route path="/area" element={<AreaPage />} />
        <Route path="/time" element={<TimePage />} />
        <Route path="/file-size" element={<FileSizePage />} />
        <Route path="/percentage" element={<PercentagePage />} />
        <Route path="/date-difference" element={<DateDifferencePage />} />
        <Route path="/calories" element={<CaloriesPage />} />
        <Route path="/bike-gear" element={<BikeGearPage />} />
        <Route path="/interest" element={<InterestPage />} />
        <Route path="/compound-interest" element={<CompoundInterestPage />} />
        <Route path="/auto-loan" element={<AutoLoanPage />} />
        <Route path="/credit-card-payoff" element={<CreditCardPayoffPage />} />
        <Route path="/retirement" element={<RetirementPage />} />
        <Route path="/investment-growth" element={<InvestmentGrowthPage />} />
        <Route path="/refinance" element={<RefinancePage />} />
        <Route path="/down-payment" element={<DownPaymentPage />} />
        <Route path="/net-worth" element={<NetWorthPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default App
