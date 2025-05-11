import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useFinanceData } from "../../lib/SupabaseFetch";

import ForecastModule from "../forecast/ForecastModule";
import GoalSummary from "../goals/GoalSummary";
import BudgetSummary from "../budget/BudgetSummary";
import SmartInsights from "./SmartInsights";

export default function Summary() {
  const { income, expense, savings, budget } = useFinanceData();
  const printRef = useRef(null);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);
  const net = totalIncome - totalExpense;

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Luxa_Financial_Summary",
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 Financial Summary</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export as PDF
        </button>
      </div>

      <div ref={printRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <SummaryCard title="Total Income" amount={totalIncome} color="green" />
          <SummaryCard title="Total Expense" amount={totalExpense} color="red" />
          <SummaryCard title="Net Balance" amount={net} color="blue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <GoalSummary />
          <BudgetSummary />
        </div>

        <ForecastModule />
        <SmartInsights />
      </div>
    </div>
  );
}

function SummaryCard({ title, amount, color }: { title: string; amount: number; color: string }) {
  const colorMap: any = {
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };

  return (
    <div className={`rounded-lg p-4 shadow ${colorMap[color]}`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-2xl font-bold">₹{amount.toLocaleString()}</p>
    </div>
  );
}
