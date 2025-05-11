import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type SavingData = {
  id: string;
  amount: number;
  month: string;
  goal_name: string;
  created_at: string;
};

type GoalData = {
  id: string;
  goal_name: string;
  target_amount: number;
  created_at: string;
};

export default function SavingsOverview() {
  const [savingsData, setSavingsData] = useState<SavingData[]>([]);
  const [goalData, setGoalData] = useState<GoalData[]>([]);
  const [monthlySavings, setMonthlySavings] = useState<{ month: string; total: number }[]>([]);
  const [goalSummaries, setGoalSummaries] = useState<{ goal: string; saved: number; target: number; progress: number }[]>([]);
  const [bestMonth, setBestMonth] = useState<string>('');
  const [bestGoal, setBestGoal] = useState<string>('');
  const [savingRate, setSavingRate] = useState<number>(0);
  const [savingTrend, setSavingTrend] = useState<string>('');
  const [ytdSavings, setYtdSavings] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: savings, error: savingsError } = await supabase.from('savings').select('*');
    const { data: goals, error: goalsError } = await supabase.from('goal').select('*');
    const { data: incomes, error: incomesError } = await supabase.from('income').select('*');

    if (savingsError) console.error("Savings Fetch Error:", savingsError);
    else setSavingsData(savings as SavingData[]);

    if (goalsError) console.error("Goal Fetch Error:", goalsError);
    else setGoalData(goals as GoalData[]);

    if (incomesError) console.error("Income Fetch Error:", incomesError);
    else {
      const totalIncome = incomes?.reduce((sum, entry) => sum + (entry.amount || 0), 0) || 0;
      const totalSavings = savings?.reduce((sum, entry) => sum + (entry.amount || 0), 0) || 0;
      const rate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
      setSavingRate(rate);
    }
  };

  useEffect(() => {
    if (savingsData.length > 0 && goalData.length > 0) {
      const monthMap: { [key: string]: number } = {};
      const goalMap: { [key: string]: number } = {};

      savingsData.forEach((entry) => {
        const month = entry.month || "Unknown";
        monthMap[month] = (monthMap[month] || 0) + (entry.amount || 0);

        const goal = entry.goal_name || "Other";
        goalMap[goal] = (goalMap[goal] || 0) + (entry.amount || 0);
      });

      const monthArray = Object.entries(monthMap).map(([month, total]) => ({ month, total }));
      monthArray.sort((a, b) => new Date(`01 ${a.month} 2025`).getTime() - new Date(`01 ${b.month} 2025`).getTime());
      setMonthlySavings(monthArray);

      const ytdTotal = savingsData
        .filter((entry) => {
          const entryDate = new Date(entry.created_at);
          return entryDate.getFullYear() === 2025;
        })
        .reduce((sum, entry) => sum + (entry.amount || 0), 0);
      setYtdSavings(ytdTotal);

      if (monthArray.length >= 2) {
        const prev = monthArray[monthArray.length - 2].total;
        const curr = monthArray[monthArray.length - 1].total;
        const trend = curr > prev
          ? `Savings Increased by ₹${(curr - prev).toLocaleString()} 📈`
          : curr < prev
          ? `Savings Decreased by ₹${(prev - curr).toLocaleString()} 📉`
          : "Savings remained the same. 😐";
        setSavingTrend(trend);
      } else {
        setSavingTrend("Not enough data to detect trend. 📊");
      }

      const bestMonthEntry = Object.entries(monthMap).sort((a, b) => b[1] - a[1])[0];
      setBestMonth(bestMonthEntry ? bestMonthEntry[0] : '');

      const bestGoalEntry = Object.entries(goalMap).sort((a, b) => b[1] - a[1])[0];
      setBestGoal(bestGoalEntry ? bestGoalEntry[0] : '');

      const goalArray = Object.entries(goalMap).map(([goal, saved]) => {
        const goalEntry = goalData.find((g) => g.goal_name === goal);
        const target = goalEntry?.target_amount || 10000;
        const progress = Math.min((saved / target) * 100, 100);
        return { goal, saved, target, progress };
      });

      setGoalSummaries(goalArray);
    }
  }, [savingsData, goalData]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">💸 Savings Overview</h2>

      {/* 🧠 Best Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InsightCard title="🌟 Best Saving Month" value={bestMonth || "No Data"} />
        <InsightCard title="🎯 Top Saving Goal" value={bestGoal || "No Data"} />
      </div>

      {/* 🚀 Smart Savings Tip */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2">
        <h2 className="text-sm uppercase tracking-wider font-semibold">Smart Savings Tip 🚀</h2>
        <p className="text-2xl font-bold">{getSmartTip(savingRate)}</p>
      </div>

      {/* 📈 Monthly Savings Growth Chart */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-4">
        <h3 className="text-lg font-semibold">📈 Monthly Savings Growth</h3>
        {monthlySavings.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySavings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-400">No savings data yet. Start saving! 💰</p>
        )}
      </div>

      {/* 📈📉 Savings Trend Insight */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2">
        <h3 className="text-lg font-semibold">📈📉 Savings Trend Insight</h3>
        <p className="text-lg">{savingTrend}</p>
      </div>

      {/* 📊 Year-to-Date Savings */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2">
        <h3 className="text-lg font-semibold">📊 Year-to-Date Savings (2025)</h3>
        <p className="text-2xl font-bold">₹{ytdSavings.toLocaleString()}</p>
      </div>

      {/* 🎯 Goal Saving Progress */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-4">
        <h3 className="text-lg font-semibold">🎯 Goal Saving Progress</h3>
        {goalSummaries.length > 0 ? (
          <div className="space-y-4">
            {goalSummaries.map((goal) => (
              <div key={goal.goal} className="space-y-1">
                <div className="flex justify-between text-sm font-semibold">
                  <span>{goal.goal}</span>
                  <span>{goal.progress.toFixed(1)}% (₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()})</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No goals saved yet! 🎯</p>
        )}
      </div>
    </div>
  );
}

function InsightCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</h2>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

function getSmartTip(rate: number) {
  if (rate <= 0) return "Let's start saving! 🌱";
  if (rate > 0 && rate <= 10) return "Good start! Let's grow it! 🌟";
  if (rate > 10 && rate <= 20) return "Steady savings! Keep it up! 💪";
  if (rate > 20 && rate <= 30) return "Strong savings habit! 🚀";
  return "Super Saver! 🏆";
}
