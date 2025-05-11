import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

interface BudgetItem {
  category: string;
  amount: number;
  month: string;
}

export default function BudgetSummary() {
  const session = useSession();
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [allMonths, setAllMonths] = useState<string[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!session?.user?.id) return;

      let query = supabase
        .from("budget")
        .select("*")
        .eq("user_id", session.user.id);

      if (selectedMonth) {
        query = query.eq("month", selectedMonth);
      }

      const { data } = await query;
      if (data) {
        setBudgets(data);
        const months = Array.from(new Set(data.map((item) => item.month)));
        setAllMonths(months);
      }
    };

    fetchBudgets();

    // Realtime subscription for budget changes
    const subscription = supabase
      .channel("budget_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "budget" },
        () => fetchBudgets()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [session, selectedMonth]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">📦 Budget Summary</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="text-sm px-2 py-1 border rounded dark:bg-gray-700"
        >
          <option value="">All Months</option>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {budgets.length === 0 ? (
        <p className="text-sm text-gray-500">No budget data found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-600 text-sm">
          {budgets.map((item, idx) => (
            <li key={idx} className="py-2 flex justify-between">
              <span>
                {item.category}{" "}
                <span className="text-gray-400 text-xs">({item.month})</span>
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-300">
                ₹{item.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
