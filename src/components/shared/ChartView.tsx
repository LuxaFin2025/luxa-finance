import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFinanceData } from "./SupabaseFetch";

interface MonthlyData {
  month: string;
  Income: number;
  Expense: number;
}

export default function ChartView() {
  const { income, expense } = useFinanceData();

  // Group by Month and Calculate Sum
  const groupByMonth = (arr: any[]): { [key: string]: number } => {
    const result: { [key: string]: number } = {};
    arr.forEach((item) => {
      const date = new Date(item.date);
      const month = date.toLocaleString("default", { month: "short" });
      if (!result[month]) result[month] = 0;
      result[month] += item.amount;
    });
    return result;
  };

  const incomeByMonth = groupByMonth(income);
  const expenseByMonth = groupByMonth(expense);

  const months = [...new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)])];

  const chartData: MonthlyData[] = months.map((month) => ({
    month,
    Income: incomeByMonth[month] || 0,
    Expense: expenseByMonth[month] || 0,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2 className="text-lg font-medium my-2">Monthly Income vs Expense</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#16a34a" />
          <Bar dataKey="Expense" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}