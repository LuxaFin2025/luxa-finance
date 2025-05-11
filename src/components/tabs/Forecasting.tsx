import React, { useMemo } from 'react';
import ForecastChart from '../shared/ForecastChart';
import DataCard from '../shared/DataCard';
import InsightCard from '../shared/InsightCard';

interface Entry {
  date: string;
  amount: number;
}

interface ForecastingProps {
  incomes: Entry[];
  expenses: Entry[];
}

const Forecasting: React.FC<ForecastingProps> = ({ incomes, expenses }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const forecastData = useMemo(() => {
    return months.map((month, index) => {
      const monthStr = `2025-${String(index + 1).padStart(2, '0')}`;

      const monthIncome = incomes
        .filter((item) => item.date.includes(monthStr))
        .reduce((sum, i) => sum + i.amount, 0);

      const monthExpense = expenses
        .filter((item) => item.date.includes(monthStr))
        .reduce((sum, e) => sum + e.amount, 0);

      const predicted = Math.round(monthIncome * 1.1);

      return {
        month,
        actual: monthIncome,
        predicted,
        expense: monthExpense,
      };
    });
  }, [incomes, expenses]);

  const insight = 'ஏப்ரல் மாத செலவுகள் 18% அதிகம். உங்களால் ₹400 சேமிக்க முடியும்.';

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Forecast Overview</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DataCard
          title="Estimated Savings"
          value="₹12,450"
          change="+14.2%"
          trend="up"
          color="green"
          timeframe="Next 6 months"
        />
        <DataCard
          title="Expected Expenses"
          value="₹8,120"
          change="-2.7%"
          trend="down"
          color="red"
          timeframe="Next month"
        />
        <DataCard
          title="Growth Potential"
          value="₹4,950"
          change="+9.1%"
          trend="up"
          color="blue"
          timeframe="This Quarter"
        />
      </div>

      {/* Forecast chart */}
      <ForecastChart data={forecastData} />

      {/* Insights */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightCard
          title="AI Forecast Insight"
          description={insight}
          actionText="மேலும் காண்க"
          icon="bulb"
          color="green"
        />
      </div>
    </div>
  );
};

export default Forecasting;
