import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ForecastChartProps {
  data: {
    month: string;
    actual: number;
    predicted: number;
    expense?: number;
  }[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Forecast: Income vs Expenses</h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expense" fill="#F87171" name="Expense" />
            <Line type="monotone" dataKey="actual" stroke="#3B82F6" name="Actual Income" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeDasharray="5 5" name="Predicted Income" strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;
