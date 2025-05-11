import React from "react";
import { useFinanceData } from "../shared/SupabaseFetch";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const BudgetPieChart = () => {
  const { expense, budget } = useFinanceData();

  const totalBudget = budget.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);

  const data = [
    { name: "Used", value: totalExpense },
    { name: "Remaining", value: Math.max(0, totalBudget - totalExpense) },
  ];

  const COLORS = ["#EF4444", "#10B981"];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-md font-semibold mb-3">Budget Usage Overview</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetPieChart;
