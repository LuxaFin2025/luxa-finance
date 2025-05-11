import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

// Import Components
import BudgetAlert from "./BudgetAlert";
import BudgetCategoryCard from "./BudgetCategoryCard";
import BudgetSummary from "./BudgetSummary";
import BudgetSummaryChart from "./BudgetSummaryChart";

const COLORS = ["#34d399", "#f87171"];

export default function BudgetOverview() {
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [budgetUsage, setBudgetUsage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBudgetAndExpenses();
  }, []);

  useEffect(() => {
    calculateBudgetUsage();
  }, [budgetData, expenseData]);

  const fetchBudgetAndExpenses = async () => {
    setIsLoading(true);

    const { data: budget, error: budgetError } = await supabase.from("budget").select("*");
    const { data: expenses, error: expenseError } = await supabase.from("expense").select("*");

    if (budgetError) console.error("Budget Fetch Error:", budgetError);
    else setBudgetData(budget || []);

    if (expenseError) console.error("Expense Fetch Error:", expenseError);
    else setExpenseData(expenses || []);

    setIsLoading(false);
  };

  const calculateBudgetUsage = () => {
    if (budgetData.length === 0 || expenseData.length === 0) {
      setBudgetUsage(0);
      return;
    }

    const totalBudget = budgetData.reduce((sum, b) => sum + (b.planned_amount || 0), 0);
    const totalExpense = expenseData.reduce((sum, e) => sum + (e.amount || 0), 0);

    if (totalBudget > 0) {
      const usage = (totalExpense / totalBudget) * 100;
      setBudgetUsage(usage);
    } else {
      setBudgetUsage(0);
    }
  };

  const prepareMonthwiseData = () => {
    const monthSet = new Set<string>();
    budgetData.forEach((b) => monthSet.add(b.month));
    expenseData.forEach((e) => monthSet.add(e.month));
    const months = Array.from(monthSet);

    const finalData = months.map((month) => {
      const budgetMonth = budgetData.filter((b) => b.month === month);
      const expenseMonth = expenseData.filter((e) => e.month === month);

      const totalBudget = budgetMonth.reduce((sum, b) => sum + (b.planned_amount || 0), 0);
      const totalExpense = expenseMonth.reduce((sum, e) => sum + (e.amount || 0), 0);

      return {
        month,
        budget: totalBudget,
        expense: totalExpense,
      };
    });

    return finalData;
  };

  // 🧠 Smart Budget Message Function
  const getBudgetSmartMessage = () => {
    if (budgetUsage <= 80) {
      return {
        message: "👏 Great! You are saving well!",
        color: "text-green-500",
      };
    } else if (budgetUsage <= 100) {
      return {
        message: "⚡ Good, but spend carefully!",
        color: "text-yellow-500",
      };
    } else {
      return {
        message: "⚠️ Warning! You have overspent!",
        color: "text-red-500",
      };
    }
  };

  const usageData = [
    { name: "Used", value: Math.min(budgetUsage, 100) },
    { name: "Remaining", value: Math.max(100 - budgetUsage, 0) },
  ];

  // 🌀 Loading Spinner
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="text-gray-500 dark:text-gray-400 font-semibold">Loading your Budget Overview...</p>
      </div>
    );
  }

  // ✅ Main Dashboard
  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">💼 Budget Overview</h2>

      {/* Budget Alert */}
      <BudgetAlert />

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column */}
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 ease-in-out">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={usageData}
                  dataKey="value"
                  outerRadius={100}
                  innerRadius={60}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={5}
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="text-center mt-2 space-y-2">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {budgetUsage <= 100 ? "✅ Within Budget" : "⚠️ Over Budget"}
              </p>
              <p className={`text-3xl font-bold ${budgetUsage <= 100 ? "text-green-500" : "text-red-500"}`}>
                {budgetUsage.toFixed(1)}%
              </p>

              {/* 🧠 Smart Message */}
              <p className={`text-sm font-semibold ${getBudgetSmartMessage().color}`}>
                {getBudgetSmartMessage().message}
              </p>
            </div>
          </div>

          {/* Category Wise Cards */}
          <BudgetCategoryCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Monthwise Budget vs Expenses */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 ease-in-out">
            <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📅 Monthly Budget vs Expenses
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={prepareMonthwiseData()} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#34d399" name="Budget Planned" />
                <Bar dataKey="expense" fill="#f87171" name="Expenses Done" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Budget Summary Chart */}
          <BudgetSummaryChart />
        </div>

      </div>

      {/* Full Table */}
      <div className="mt-8">
        <BudgetSummary />
      </div>
    </div>
  );
}
