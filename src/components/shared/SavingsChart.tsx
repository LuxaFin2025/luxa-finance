import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', savings: 2000, goal: 2000 },
  { month: 'Feb', savings: 2800, goal: 2500 },
  { month: 'Mar', savings: 3200, goal: 3000 },
  { month: 'Apr', savings: 4000, goal: 3500 },
  { month: 'May', savings: 4500, goal: 4000 },
  { month: 'Jun', savings: 5200, goal: 4500 },
];

export const SavingsChart: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#3B82F6"
            fill="#93C5FD"
            strokeWidth={2}
            name="Actual Savings"
          />
          <Area
            type="monotone"
            dataKey="goal"
            stroke="#10B981"
            fill="#6EE7B7"
            strokeWidth={2}
            name="Savings Goal"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};