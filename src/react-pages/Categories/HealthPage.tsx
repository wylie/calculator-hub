import Card from '../../components/Card';

export default function HealthPage() {
  const tools = [
    {
      path: '/calories',
      title: 'Calorie Calculator',
      description: 'Calculate your BMR and daily calorie targets based on activity level and goals.',
      icon: 'nutrition',
    },
    {
      path: '/bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and assess your weight category.',
      icon: 'monitor_weight',
    },
    {
      path: '/tdee',
      title: 'TDEE Calculator',
      description: 'Calculate Total Daily Energy Expenditure for weight management.',
      icon: 'local_fire_department',
    },
    {
      path: '/ideal-weight',
      title: 'Ideal Weight Calculator',
      description: 'Determine your ideal body weight based on height and gender.',
      icon: 'fitness_center',
    },
    {
      path: '/water-intake',
      title: 'Water Intake Calculator',
      description: 'Calculate your recommended daily water intake for optimal hydration.',
      icon: 'water_drop',
    },
    {
      path: '/protein-intake',
      title: 'Protein Intake Calculator',
      description: 'Determine your daily protein needs based on weight and activity level.',
      icon: 'egg',
    },
    {
      path: '/age',
      title: 'Age Calculator',
      description: 'Calculate your exact age in years, months, and days.',
      icon: 'cake',
    },
    {
      path: '/tip',
      title: 'Tip Calculator',
      description: 'Calculate tips and split bills for dining out and services.',
      icon: 'restaurant',
    },
    {
      path: '/bike-gear',
      title: 'Bike Gear Calculator',
      description: 'Compute gear inches and speed estimates for your bicycle setup.',
      icon: 'two_wheeler',
    },
    {
      path: '/cycling-power-to-weight',
      title: 'Cycling Power-to-Weight Calculator',
      description: 'Calculate your FTP power-to-weight ratio for cycling performance.',
      icon: 'speed',
    },
    {
      path: '/tire-pressure',
      title: 'Tire Pressure Calculator',
      description: 'Find optimal tire pressure for your bike based on weight and tire size.',
      icon: 'tire_repair',
    },
    {
      path: '/hiking-pace',
      title: 'Hiking Pace Calculator',
      description: 'Estimate hiking time based on distance, elevation gain, and fitness level.',
      icon: 'hiking',
    },
    {
      path: '/calories-cycling',
      title: 'Calories Burned Cycling',
      description: 'Calculate calories burned during cycling sessions based on intensity.',
      icon: 'directions_bike',
    },
    {
      path: '/fuel-efficiency',
      title: 'Fuel Efficiency Calculator',
      description: 'Calculate MPG, fuel costs, and trip expenses for your vehicle.',
      icon: 'local_gas_station',
    },
    {
      path: '/gpa',
      title: 'GPA Calculator',
      description: 'Calculate your weighted GPA and letter grade from course grades.',
      icon: 'grade',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Health & Lifestyle Calculators</h1>
      <p className="text-slate-600 mb-8">
        Tools for health, fitness, nutrition, cycling, and everyday lifestyle calculations to help you stay on track.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a key={tool.path} href={tool.path}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-3xl text-blue-600 mb-3">
                  {tool.icon}
                </span>
                <h2 className="text-base font-semibold text-slate-900 mb-2">{tool.title}</h2>
                <p className="text-xs text-slate-600">{tool.description}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
