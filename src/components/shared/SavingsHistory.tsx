import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

interface Saving {
  goal_name: string;
  amount: number;
  month: string;
  note: string;
  created_at: string;
}

export default function SavingsHistory() {
  const session = useSession();
  const [savings, setSavings] = useState<Saving[]>([]);
  const [allSavings, setAllSavings] = useState<Saving[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");

  useEffect(() => {
    const fetchSavings = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from("savings")
        .select("goal_name, amount, month, note, created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching savings:", error.message);
      } else {
        setAllSavings(data || []);
        setSavings(data || []);
      }
    };

    fetchSavings();
  }, [session]);

  const handleFilter = (goal: string) => {
    setSelectedGoal(goal);
    if (goal === "") {
      setSavings(allSavings);
    } else {
      const filtered = allSavings.filter((s) => s.goal_name === goal);
      setSavings(filtered);
    }
  };

  const uniqueGoals = Array.from(new Set(allSavings.map((s) => s.goal_name)));

  if (allSavings.length === 0) {
    return <p className="text-sm text-gray-500">No savings history found.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Savings History</h2>
        <select
          value={selectedGoal}
          onChange={(e) => handleFilter(e.target.value)}
          className="px-3 py-1 border rounded bg-white dark:bg-gray-700 text-sm"
        >
          <option value="">All Goals</option>
          {uniqueGoals.map((goal, i) => (
            <option key={i} value={goal}>
              {goal}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th className="py-2">Date</th>
              <th className="py-2">Goal</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Month</th>
              <th className="py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {savings.map((item, index) => (
              <tr key={index} className="border-b dark:border-gray-700">
                <td className="py-2">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="py-2">{item.goal_name}</td>
                <td className="py-2">₹{item.amount}</td>
                <td className="py-2">{item.month || "-"}</td>
                <td className="py-2">{item.note || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
