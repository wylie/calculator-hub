import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/Home/HomePage'
import MortgagePage from './pages/Mortgage/MortgagePage'
import BudgetPage from './pages/Budget/BudgetPage'
import WeatherPage from './pages/Weather/WeatherPage'
import CaloriesPage from './pages/Calories/CaloriesPage'
import BikeGearPage from './pages/BikeGear/BikeGearPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mortgage" element={<MortgagePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/calories" element={<CaloriesPage />} />
        <Route path="/bike-gear" element={<BikeGearPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default App
