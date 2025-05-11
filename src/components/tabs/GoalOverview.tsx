import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // ✅ Corrected path
import { useSession } from "@supabase/auth-helpers-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Goal {
  goal_name: string;
  progress: number;
  target_amount: number;
}

export default function GoalOverview() {
  const session = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchGoals = async () => {
      const { data, error } = await supabase
        .from("goal")
        .select("goal_name, progress, target_amount")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching goals:", error.message);
      } else {
        setGoals(data || []);
      }
    };

    fetchGoals();
  }, [session]);

  return (
    <div className="mt-6 space-y-6">
      <h2 className="text-xl font-bold">🎯 Goal Overview</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">Goal Progress Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={goals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="goal_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#34d399" name="Saved" />
            <Bar dataKey="target_amount" fill="#60a5fa" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">Goal-wise Summary</h3>
        <table className="w-full table-auto text-sm">
          <thead>
            <tr>
              <th className="text-left py-2">Goal</th>
              <th className="text-right py-2">Progress</th>
              <th className="text-right py-2">Target</th>
              <th className="text-right py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => {
              const percent = (goal.progress / goal.target_amount) * 100;
              const status = percent >= 100 ? "Completed" : `${percent.toFixed(0)}%`;
              const statusColor = percent >= 100 ? "text-green-600" : "text-yellow-600";
              return (
                <tr key={goal.goal_name}>
                  <td className="py-2">{goal.goal_name}</td>
                  <td className="py-2 text-right">₹{goal.progress.toLocaleString()}</td>
                  <td className="py-2 text-right">₹{goal.target_amount.toLocaleString()}</td>
                  <td className={`py-2 text-right font-medium ${statusColor}`}>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}