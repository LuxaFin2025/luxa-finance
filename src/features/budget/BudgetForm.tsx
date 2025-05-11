import React, { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../../lib/supabaseClient";

interface BudgetItem {
  category: string;
  amount: number;
  month: string;
}

export default function BudgetForm() {
  const session = useSession();
  const [rows, setRows] = useState<BudgetItem[]>([
    { category: "House", amount: 0, month: "May" },
    { category: "Food", amount: 0, month: "May" },
    { category: "Health", amount: 0, month: "May" },
  ]);

  const handleChange = (index: number, field: keyof BudgetItem, value: string | number) => {
    const updated = [...rows];
    updated[index][field] = field === "amount" ? parseFloat(value as string) : value;
    setRows(updated);
  };

  const saveBudgets = async () => {
    const user_id = session?.user?.id;
    if (!user_id) {
      alert("User not authenticated.");
      return;
    }

    const dataWithUser = rows.map((item) => ({
      ...item,
      user_id,
    }));

    const { error } = await supabase.from("budget").insert(dataWithUser);
    if (error) {
      alert(`Error saving budgets: ${error.message}`);
    } else {
      alert("Budgets saved successfully!");
      setRows([
        { category: "House", amount: 0, month: "May" },
        { category: "Food", amount: 0, month: "May" },
        { category: "Health", amount: 0, month: "May" },
      ]);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Add Monthly Budget</h2>
      <table className="w-full text-sm table-fixed border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="p-2 w-1/3">Category</th>
            <th className="p-2 w-1/3">Amount (₹)</th>
            <th className="p-2 w-1/3">Month</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, idx) => (
            <tr key={idx}>
              <td className="p-2">
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) => handleChange(idx, "category", e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-900"
                  required
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => handleChange(idx, "amount", e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-900"
                  required
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={item.month}
                  onChange={(e) => handleChange(idx, "month", e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-900"
                  placeholder="e.g. May"
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveBudgets}
        className="mt-6 px-4 py-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded"
      >
        Save Budget Plan
      </button>
    </div>
  );
}
