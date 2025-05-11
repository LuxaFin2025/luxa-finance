import React from "react";
import BudgetAlert from "./BudgetAlert";
import BudgetPieChart from "./BudgetPieChart";
import BudgetSummary from "./BudgetSummary";

export default function BudgetOverview() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">💼 Budget Overview</h1>

      {/* Alerts & PieChart side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BudgetAlert />
        <BudgetPieChart />
      </div>

      {/* Monthly Budget Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <BudgetSummary />
      </div>
    </div>
  );
}