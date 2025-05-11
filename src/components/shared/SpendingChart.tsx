import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', income: 5000, expenses: 4000 },
  { month: 'Feb', income: 5200, expenses: 4200 },
  { month: 'Mar', income: 5500, expenses: 4500 },
  { month: 'Apr', income: 5800, expenses: 4800 },
  { month: 'May', income: 6000, expenses: 5100 },
  { month: 'Jun', income: 6200, expenses: 5200 },
];

export const SpendingChart: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#10B981" name="Income" />
          <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


export default SpendingChart;