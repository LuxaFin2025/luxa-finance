import React from "react";
import { useFinanceData } from "../shared/SupabaseFetch";

export default function BudgetSummary() {
  const { expense, budget } = useFinanceData();

  const summary = budget.map((b) => {
    const spent = expense
      .filter((e) => e.category === b.category)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      category: b.category,
      planned: b.amount,
      spent,
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-md font-semibold mb-3">Category-wise Budget Summary</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-300 dark:border-gray-700">
            <th className="py-2">Category</th>
            <th>Planned</th>
            <th>Spent</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((row) => (
            <tr key={row.category} className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-2">{row.category}</td>
              <td>₹{row.planned.toLocaleString()}</td>
              <td>₹{row.spent.toLocaleString()}</td>
              <td className={row.spent > row.planned ? "text-red-500" : "text-green-600"}>
                {row.spent > row.planned ? "Over" : "Within"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
