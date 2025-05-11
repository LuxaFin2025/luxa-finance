import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

type GoalData = {
  id: string;
  goal_name: string;
  target_amount: number;
  month: string;
  created_at: string;
};

type SavingData = {
  id: string;
  amount: number;
  goal_name: string;
  created_at: string;
};

export default function GoalOverview() {
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [savings, setSavings] = useState<SavingData[]>([]);
  const [goalProgress, setGoalProgress] = useState<{ goal: string; saved: number; target: number; progress: number }[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: goalData, error: goalError } = await supabase.from('goal').select('*');
    const { data: savingData, error: savingError } = await supabase.from('savings').select('*');

    if (goalError) console.error("Goal Fetch Error:", goalError);
    else setGoals(goalData as GoalData[]);

    if (savingError) console.error("Savings Fetch Error:", savingError);
    else setSavings(savingData as SavingData[]);
  };

  useEffect(() => {
    if (goals.length > 0 && savings.length > 0) {
      const groupedSavings: { [key: string]: number } = {};

      savings.forEach((s) => {
        const goalName = s.goal_name || "Unknown";
        groupedSavings[goalName] = (groupedSavings[goalName] || 0) + (s.amount || 0);
      });

      const progressArray = goals.map((goal) => {
        const saved = groupedSavings[goal.goal_name] || 0;
        const progress = Math.min((saved / goal.target_amount) * 100, 100);
        return {
          goal: goal.goal_name,
          saved,
          target: goal.target_amount,
          progress,
        };
      });

      setGoalProgress(progressArray);
    }
  }, [goals, savings]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">🎯 Goal Overview</h1>

      {/* 🔥 Goals Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goalProgress.map((item) => (
          <div key={item.goal} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{item.goal}</h2>
              {item.progress >= 100 && (
                <span className="text-green-500 text-xs font-bold">Completed ✅</span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Saved: ₹{item.saved.toLocaleString()} / ₹{item.target.toLocaleString()}
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${item.progress >= 100 ? "bg-green-500" : "bg-blue-500"}`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <p className="text-right text-xs text-gray-400">{item.progress.toFixed(1)}%</p>
          </div>
        ))}
      </div>

      {/* 🧠 Smart Goal Insights */}
      {goalProgress.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2 mt-6">
          <h2 className="text-sm uppercase tracking-wider font-semibold">Smart Goal Insights 🧠</h2>
          <p className="text-lg font-bold">
            🥇 Best Progress Goal:{" "}
            {goalProgress.sort((a, b) => b.progress - a.progress)[0]?.goal || "No Data"}
          </p>
          <p className="text-md">
            🕑 Pending Goals:{" "}
            {goalProgress.filter((g) => g.progress < 100).length} Goals Pending
          </p>
        </div>
      )}

      {/* 📈 Goal Completion Summary Chart */}
      {goalProgress.length > 0 && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2 mt-6">
          <h2 className="text-lg font-semibold">🎯 Goal Completion Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Completed", value: goalProgress.filter((g) => g.progress >= 100).length },
                  { name: "Pending", value: goalProgress.filter((g) => g.progress < 100).length },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label
                dataKey="value"
              >
                <Cell key="completed" fill="#22C55E" />
                <Cell key="pending" fill="#D1D5DB" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 📊 Goal Progress Chart */}
      {goalProgress.length > 0 && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out space-y-2 mt-6"
          >
          <h2 className="text-lg font-semibold">📊 Goal Progress Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={goalProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="goal" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
