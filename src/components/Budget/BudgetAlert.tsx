import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function BudgetAlert() {
  const session = useSession();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const checkBudgetAlerts = async () => {
      if (!session?.user?.id) return;

      const { data: budgets } = await supabase
        .from("budget")
        .select("category, amount, month")
        .eq("user_id", session.user.id);

      const { data: expenses } = await supabase
        .from("expense")
        .select("category, amount, month, user_id")
        .eq("user_id", session.user.id);

      const groupedExpenses = expenses?.reduce((acc: any, item) => {
        const key = `${item.category}_${item.month}`;
        acc[key] = (acc[key] || 0) + item.amount;
        return acc;
      }, {}) || {};

      const newAlerts = budgets?.map((b) => {
        const key = `${b.category}_${b.month}`;
        const spent = groupedExpenses[key] || 0;
        if (spent > b.amount) {
          return `⚠️ ${b.category} exceeded budget in ${b.month}: ₹${spent} / ₹${b.amount}`;
        }
        return null;
      }).filter(Boolean) as string[];

      setAlerts(newAlerts);
    };

    checkBudgetAlerts();
  }, [session]);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">⚠ Budget Alerts</h3>
      <ul className="text-sm list-disc pl-5 space-y-1">
        {alerts.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
