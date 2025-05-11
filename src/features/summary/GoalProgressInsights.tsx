import { useEffect, useState } from "react";
import { useFinanceData } from "../../lib/SupabaseFetch";
import GoalProgressInsights from "./GoalProgressInsights"; // ✅

export default function SmartInsights() {
  const { income, expense, savings, goal, budget, networth } = useFinanceData();
  const [savingsRate, setSavingsRate] = useState(0);
  const [netWorthChange, setNetWorthChange] = useState(0);
  const [budgetUsage, setBudgetUsage] = useState(0);

  useEffect(() => {
    if (income && income.length > 0 && savings && savings.length > 0) {
      const totalIncome = income.reduce((sum, i) => sum + (i.amount || 0), 0);
      const totalSavings = savings.reduce((sum, s) => sum + (s.amount || 0), 0);
      if (totalIncome > 0) {
        const rate = (totalSavings / totalIncome) * 100;
        setSavingsRate(rate);
      } else {
        setSavingsRate(0);
      }
    } else {
      setSavingsRate(0);
    }

    if (networth && networth.length > 1) {
      const sortedNetworth = [...networth].sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

      const latestAssets = sortedNetworth[sortedNetworth.length - 1].assets || 0;
      const latestLiabilities = sortedNetworth[sortedNetworth.length - 1].liabilities || 0;
      const previousAssets = sortedNetworth[sortedNetworth.length - 2].assets || 0;
      const previousLiabilities = sortedNetworth[sortedNetworth.length - 2].liabilities || 0;

      const latestNet = latestAssets - latestLiabilities;
      const previousNet = previousAssets - previousLiabilities;

      const change = latestNet - previousNet;
      setNetWorthChange(change);
    } else {
      setNetWorthChange(0);
    }

    if (budget && budget.length > 0 && expense && expense.length > 0) {
      const totalBudget = budget.reduce((sum, b) => sum + (b.planned_amount || 0), 0);
      const totalExpense = expense.reduce((sum, e) => sum + (e.amount || 0), 0);
      if (totalBudget > 0) {
        const usage = (totalExpense / totalBudget) * 100;
        setBudgetUsage(usage);
      } else {
        setBudgetUsage(0);
      }
    } else {
      setBudgetUsage(0);
    }
  }, [income, expense, savings, goal, budget, networth]);

  return (
    <div className="space-y-6">
      
      {/* 🎯 Goal Progress Overview */}
      <GoalProgressInsights />

      {/* 💰 Overall Savings Rate */}
      <InsightCard
        title="💰 Overall Savings Rate"
        value={`${savingsRate.toFixed(1)}%`}
        message={savingsRate > 20 ? "Awesome savings rate! 🎉" : "Let's boost your savings! 🚀"}
      />

      {/* 📈 Net Worth Change */}
      <InsightCard
        title="📈 Net Worth Change"
        value={`₹${netWorthChange.toLocaleString()}`}
        message={netWorthChange >= 0 ? "Your net worth is growing! 📈" : "Review your finances! 📉"}
      />

      {/* 📋 Budget Usage */}
      <InsightCard
        title="📋 Budget Usage"
        value={`${budgetUsage.toFixed(1)}%`}
        message={budgetUsage <= 100 ? "On track with your budget! 📋" : "Overspending alert! ⚠️"}
      />
      
    </div>
  );
}

function InsightCard({ title, value, message }: { title: string; value: string; message: string }) {
  return (
    <div className="p-4 bg-gradient-to-br from-white via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-500 space-y-2">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h2>
      <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
