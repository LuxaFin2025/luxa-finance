import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type ForecastData = {
  month: string;
  income: number;
  expense: number;
};

export default function ForecastModule() {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [smartTip, setSmartTip] = useState<string>("Loading smart tip...");
  const [savingsInsight, setSavingsInsight] = useState<string>("Loading savings trend...");

  useEffect(() => {
    fetchForecastData();
  }, []);

  const fetchForecastData = async () => {
    const { data: incomeData } = await supabase.from('income').select('*');
    const { data: expenseData } = await supabase.from('expense').select('*');

    if (incomeData && expenseData) {
      const incomeByMonth: { [key: string]: number } = {};
      const expenseByMonth: { [key: string]: number } = {};

      incomeData.forEach((inc) => {
        const month = new Date(inc.date).toLocaleString('default', { month: 'short' });
        incomeByMonth[month] = (incomeByMonth[month] || 0) + (inc.amount || 0);
      });

      expenseData.forEach((exp) => {
        const month = new Date(exp.date).toLocaleString('default', { month: 'short' });
        expenseByMonth[month] = (expenseByMonth[month] || 0) + (exp.amount || 0);
      });

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const forecast = months.map((month) => ({
        month,
        income: incomeByMonth[month] || 0,
        expense: expenseByMonth[month] || 0,
      }));

      const lastThreeIncomes = forecast.filter(f => f.income > 0).slice(-3).map(f => f.income);
      const lastThreeExpenses = forecast.filter(f => f.expense > 0).slice(-3).map(f => f.expense);

      const avgIncome = lastThreeIncomes.length ? lastThreeIncomes.reduce((a, b) => a + b, 0) / lastThreeIncomes.length : 0;
      const avgExpense = lastThreeExpenses.length ? lastThreeExpenses.reduce((a, b) => a + b, 0) / lastThreeExpenses.length : 0;

      const futureMonths = getNextThreeMonths(new Date());

      const futureForecast = futureMonths.map(month => ({
        month,
        income: Math.round(avgIncome),
        expense: Math.round(avgExpense),
      }));

      const filteredForecast = forecast.filter(f => f.income > 0 || f.expense > 0);
      const fullForecast = [...filteredForecast, ...futureForecast];
      setForecastData(fullForecast);

      const totalIncome = fullForecast.reduce((sum, item) => sum + item.income, 0);
      const totalExpense = fullForecast.reduce((sum, item) => sum + item.expense, 0);
      setSmartTip(generateSmartTip(totalIncome, totalExpense));

      // 🧠 Calculate Savings Trend Insight
      generateSavingsInsight(fullForecast);
    }
  };

  const getNextThreeMonths = (startDate: Date): string[] => {
    const months: string[] = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let startMonth = startDate.getMonth();
    for (let i = 1; i <= 3; i++) {
      months.push(monthNames[(startMonth + i) % 12]);
    }
    return months;
  };

  const generateSmartTip = (income: number, expense: number) => {
    if (income <= 0 && expense <= 0) return "Start entering your incomes and expenses to forecast better! 🌱";
    if (income > expense * 1.5) return "🎯 Great! Income strongly outpaces expenses!";
    if (expense > income) return "⚠️ Warning: Expenses are higher than Income. Plan wisely!";
    return "💬 Good balance between income and expenses. Maintain it!";
  };

  const generateSavingsInsight = (data: ForecastData[]) => {
    const savingsList = data.map(item => item.income - item.expense);
    if (savingsList.length < 2) {
      setSavingsInsight("Not enough data to analyze savings trend.");
      return;
    }
    const latest = savingsList[savingsList.length - 1];
    const previous = savingsList[savingsList.length - 2];
    if (latest > previous) {
      setSavingsInsight("🚀 Your savings are increasing! Great job! Keep it up!");
    } else if (latest < previous) {
      setSavingsInsight("⚠️ Your savings have decreased recently. Review your expenses!");
    } else {
      setSavingsInsight("➡️ Your savings remained stable compared to last month.");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">📈 Financial Forecast Overview</h2>

      {/* Smart Tip */}
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out">
        <h3 className="text-sm uppercase tracking-wider font-semibold mb-1">🧠 Smart Tip</h3>
        <p className="text-lg">{smartTip}</p>
      </div>

      {/* Forecast Area Chart */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out">
        <h3 className="text-lg font-semibold mb-2">💸 Income vs Expenses Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F87171" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#F87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="income" stroke="#34D399" fill="url(#incomeColor)" strokeWidth={2} />
            <Area type="monotone" dataKey="expense" stroke="#F87171" fill="url(#expenseColor)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 Savings Trend Line Chart */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out">
        <h3 className="text-lg font-semibold mb-2">💰 Savings Trend Over Months</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData.map(item => ({
            month: item.month,
            savings: item.income - item.expense,
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🧠 Auto Savings Insight Message */}
      <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out">
        <h3 className="text-sm uppercase tracking-wider font-semibold mb-1">🧠 Savings Insight</h3>
        <p className="text-lg">{savingsInsight}</p>
      </div>
    </div>
  );
}
