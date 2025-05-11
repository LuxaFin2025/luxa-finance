import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFinanceData } from "../lib/SupabaseFetch";

export default function ChartView() {
  const { budget } = useFinanceData();

  const totalPlanned = budget.reduce((sum, item) => sum + (item.planned_amount || 0), 0);
  const totalSpent = budget.reduce((sum, item) => sum + (item.spent_amount || 0), 0);

  const data = [
    { name: "Spent", value: totalSpent },
    { name: "Remaining", value: totalPlanned - totalSpent },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">📊 Budget Usage</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-2">
        <p>
          {totalSpent > 0
            ? `You've spent ₹${totalSpent.toLocaleString()} of ₹${totalPlanned.toLocaleString()} planned.`
            : "No budget spending recorded yet."}
        </p>
      </div>
    </div>
  );
}
