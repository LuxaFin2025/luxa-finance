import { useEffect, useState } from "react";
import { useFinanceData } from "../../lib/SupabaseFetch";

export default function SmartInsights() {
  const { income, expense, savings, goal, budget, networth } = useFinanceData();
  const [goalProgress, setGoalProgress] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [netWorthChange, setNetWorthChange] = useState(0);
  const [budgetUsage, setBudgetUsage] = useState(0);

  useEffect(() => {
    if (goal && goal.length > 0) {
      const completedGoals = goal.filter(g => g.progress >= 100).length;
      const totalGoals = goal.length;
      const progress = (completedGoals / totalGoals) * 100;
      setGoalProgress(progress);
    }

    if (income && income.length > 0 && savings && savings.length > 0) {
      const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
      const totalSavings = savings.reduce((sum, s) => sum + s.amount, 0);
      const rate = (totalSavings / totalIncome) * 100;
      setSavingsRate(rate);
    }

    if (networth && networth.length > 1) {
      const sortedNetworth = [...networth].sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
      const latest = sortedNetworth[sortedNetworth.length - 1].total;
      const previous = sortedNetworth[sortedNetworth.length - 2].total;
      const change = latest - previous;
      setNetWorthChange(change);
    }

    if (budget && budget.length > 0 && expense && expense.length > 0) {
      const totalBudget = budget.reduce((sum, b) => sum + b.planned_amount, 0);
      const totalExpense = expense.reduce((sum, e) => sum + e.amount, 0);
      const usage = (totalExpense / totalBudget) * 100;
      setBudgetUsage(usage);
    }
  }, [income, expense, savings, goal, budget, networth]);

  return (
    <div className="space-y-4">

      {/* 🎯 Goal Progress */}
      <InsightCard
        title="🎯 Goal Progress"
        value={`${goalProgress.toFixed(1)}%`}
        message={goalProgress >= 100 ? "All goals achieved! 🚀" : "Keep working towards your goals!"}
      />

      {/* 💰 Savings Rate */}
      <InsightCard
        title="💰 Savings Rate"
        value={`${savingsRate.toFixed(1)}%`}
        message={savingsRate > 20 ? "Great savings habit! 🎉" : "Try to save a bit more!"}
      />

      {/* 📈 Net Worth Trend */}
      <InsightCard
        title="📈 Net Worth Change"
        value={`₹${netWorthChange.toLocaleString()}`}
        message={netWorthChange >= 0 ? "Your net worth is growing! 📈" : "Review your finances!"}
      />

      {/* 📋 Budget Usage */}
      <InsightCard
        title="📋 Budget Usage"
        value={`${budgetUsage.toFixed(1)}%`}
        message={budgetUsage < 100 ? "On track with your budget! 📋" : "Overspending alert! ⚠️"}
      />

    </div>
  );
}

function InsightCard({ title, value, message }: { title: string; value: string; message: string }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-2">
      <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}