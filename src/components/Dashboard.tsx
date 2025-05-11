import { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import { useFinanceData } from "../lib/SupabaseFetch";
import IncomeForm from "../features/income/IncomeForm";
import ExpenseForm from "../features/expense/ExpenseForm";
import SavingsForm from "../features/savings/SavingsForm";
import BudgetForm from "../features/budget/BudgetForm";
import GoalForm from "../features/goals/GoalForm";
import GoalTracker from "../components/GoalTracker";
import ChartView from "../components/ChartView";
import ForecastModule from "../features/forecast/ForecastModule";
import FinanceAgent from "../features/summary/FinanceAgent";
import NetWorthForm from "../features/networth/NetWorthForm";
import InsightCard from "../features/summary/InsightCard";
import { supabase } from "../lib/supabaseClient";
import FormComponent from "../components/FormComponent";

export default function Dashboard() {
  const [tab, setTab] = useState("income");
  const { income, expense } = useFinanceData();
  const [savings, setSavings] = useState<any[]>([]);
  const [budget, setBudget] = useState<any[]>([]);
  const [savingRate, setSavingRate] = useState(0);
  const [budgetUsage, setBudgetUsage] = useState(0);
  const [bestSavingMonth, setBestSavingMonth] = useState("");
  const [highestSpendingMonth, setHighestSpendingMonth] = useState("");

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - totalExpense;

  useEffect(() => {
    fetchSavingsAndBudget();
  }, []);

  useEffect(() => {
    calculateTrends();
  }, [income, expense, savings, budget]);

  const fetchSavingsAndBudget = async () => {
    const { data: savingsData } = await supabase.from("savings").select("*");
    const { data: budgetData } = await supabase.from("budget").select("*");
    if (savingsData) setSavings(savingsData);
    if (budgetData) setBudget(budgetData);
  };

  const calculateTrends = () => {
    if (income.length && savings.length) {
      const totalSavings = savings.reduce((sum, item) => sum + (item.amount || 0), 0);
      setSavingRate(totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0);

      const monthMap: { [key: string]: number } = {};
      savings.forEach((s) => {
        const month = s.month || "Unknown";
        monthMap[month] = (monthMap[month] || 0) + (s.amount || 0);
      });
      const best = Object.entries(monthMap).sort(([, a], [, b]) => b - a)[0];
      if (best) setBestSavingMonth(`${best[0]} (₹${best[1].toLocaleString()})`);
    }

    if (budget.length && expense.length) {
      const totalPlanned = budget.reduce((sum, item) => sum + (item.planned_amount || 0), 0);
      setBudgetUsage(totalPlanned > 0 ? (totalExpense / totalPlanned) * 100 : 0);

      const monthMap: { [key: string]: number } = {};
      expense.forEach((e) => {
        const month = e.month || "Unknown";
        monthMap[month] = (monthMap[month] || 0) + (e.amount || 0);
      });
      const highest = Object.entries(monthMap).sort(([, a], [, b]) => b - a)[0];
      if (highest) setHighestSpendingMonth(`${highest[0]} (₹${highest[1].toLocaleString()})`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <AppHeader />
      <main className="container mx-auto p-6 space-y-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard title="Total Income" amount={totalIncome} icon="💰" trend="up" color="emerald" />
          <SummaryCard title="Total Expense" amount={totalExpense} icon="💳" trend="down" color="rose" />
          <SummaryCard title="Net Balance" amount={netBalance} icon="📊" trend={netBalance >= 0 ? "up" : "down"} color="blue" />
          <SummaryCard title="Savings Rate" amount={savingRate} icon="🎯" trend="up" color="violet" isPercentage />
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-3">
          {[
            { key: "income", label: "💰 Income" },
            { key: "expense", label: "💳 Expense" },
            { key: "savings", label: "🏦 Savings" },
            { key: "budget", label: "📊 Budget" },
            { key: "goal", label: "🎯 Goals" },
            { key: "networth", label: "📈 Net Worth" },
            { key: "forecast", label: "🤖 AI Assistant" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                tab === key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              {tab === "income" && <IncomeForm />}
              {tab === "expense" && <ExpenseForm />}
              {tab === "savings" && <SavingsForm />}
              {tab === "budget" && <BudgetForm />}
              {tab === "goal" && (
                <>
                  <GoalForm />
                  <GoalTracker />
                </>
              )}
              {tab === "networth" && <NetWorthForm />}
              {tab === "forecast" && <FinanceAgent />}
            </div>
            <div className="space-y-6">
              <ChartView />
              {tab === "budget" && (
                <InsightCard
                  title="Budget Usage"
                  value={budgetUsage}
                  suffix="%"
                  positiveMessage="Good Budget Control! 👍"
                  negativeMessage="Over Budget! ⚠️"
                  isPositive={budgetUsage <= 100}
                />
              )}
            </div>
          </div>
        </div>

        {/* 🎯 Motivational Financial Tips */}
        <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-500 ease-in-out mt-6 space-y-2">
          <h2 className="text-lg font-bold text-yellow-300 mb-2">🌟 Motivational Financial Tips</h2>

          {savingRate >= 20 ? (
            <p className="flex items-center gap-2">
              🚀 <span>Great job maintaining a strong Savings Rate! Stay consistent! 🌟</span>
            </p>
          ) : (
            <p className="flex items-center gap-2">
              📈 <span>Try to Save at least 20% of your Income. Small savings build big futures! 💡</span>
            </p>
          )}

          {budgetUsage <= 100 ? (
            <p className="flex items-center gap-2">
              🎯 <span>Excellent Budget Control! Keep tracking smartly! 💰</span>
            </p>
          ) : (
            <p className="flex items-center gap-2">
              ⚠️ <span>Overspending Alert! Review your Expenses and Adjust! 🔍</span>
            </p>
          )}
        </div>

        {/* Bottom Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">📈 Trends</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Best Saving Month:</span>
                <span className="font-semibold text-emerald-600">{bestSavingMonth}</span>
              </div>
              <div className="flex justify-between">
                <span>Highest Spending:</span>
                <span className="font-semibold text-rose-600">{highestSpendingMonth}</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <ForecastModule />
          </div>
        </div>

      </main>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: string;
  trend: "up" | "down";
  color: string;
  isPercentage?: boolean;
}

function SummaryCard({ title, amount, icon, trend, color, isPercentage = false }: SummaryCardProps) {
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
    rose: "bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300",
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    violet: "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300",
  };

  return (
    <div className={`rounded-xl p-6 transition hover:shadow-lg ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm ${trend === "up" ? "text-green-500" : "text-rose-500"}`}>
          {trend === "up" ? "↗" : "↘"}
        </span>
      </div>
      <h4 className="mt-2 text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold mt-1">
        {isPercentage ? `${amount.toFixed(1)}%` : `₹${amount.toLocaleString()}`}
      </p>
    </div>
  );
}
