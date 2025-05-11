import React, { useMemo } from 'react';
import { useFinanceData } from '../shared/SupabaseFetch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface MonthlyData {
  month: string;
  actual: number;
  predicted: number;
}

const ForecastModule: React.FC = () => {
  const { income, expense } = useFinanceData();

  const forecastData = useMemo(() => {
    const monthlyData: { [key: string]: { income: number; expense: number } } = {};
    
    [...income, ...expense].forEach(entry => {
      const date = new Date(entry.date);
      const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }
      
      if ('source' in entry) {
        monthlyData[monthKey].income += entry.amount;
      } else {
        monthlyData[monthKey].expense += entry.amount;
      }
    });

    const sortedData = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        actual: data.income - data.expense,
        predicted: data.income * 1.1 - data.expense * 0.95
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return sortedData;
  }, [income, expense]);

  const latestMonth = forecastData[forecastData.length - 1];
  const trend = latestMonth?.predicted > latestMonth?.actual ? 'up' : 'down';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Financial Forecast</h2>
        <TrendingUp className={`w-6 h-6 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
      </div>

      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#3B82F6" 
              name="Actual Balance"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#10B981" 
              strokeDasharray="5 5" 
              name="Predicted Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Monthly Trend</h3>
          <p className="text-2xl font-bold">
            {trend === 'up' ? '↗ Positive' : '↘ Negative'}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-sm font-medium">Recommendation</h3>
          </div>
          <p className="mt-2 text-sm">
            {trend === 'up' 
              ? 'Consider investing surplus in savings or emergency fund.'
              : 'Review expenses and identify areas for potential savings.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForecastModule;
