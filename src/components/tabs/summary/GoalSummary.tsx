import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

interface Goal {
  goal_name: string;
  progress: number;
  target_amount: number;
}

export default function GoalSummary() {
  const session = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!session?.user?.id) return;
      const { data } = await supabase
        .from("goal")
        .select("goal_name, progress, target_amount")
        .eq("user_id", session.user.id);
      if (data) setGoals(data);
    };
    fetchGoals();
  }, [session]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">🎯 Goal Summary</h2>
      {goals.length === 0 ? (
        <p className="text-sm text-gray-500">No goals found.</p>
      ) : (
        <ul className="space-y-3">
          {goals.map((goal) => {
            const percentage = Math.min(100, Math.round((goal.progress / goal.target_amount) * 100));
            return (
              <li key={goal.goal_name}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{goal.goal_name}</span>
                  <span>
                    ₹{goal.progress} / ₹{goal.target_amount} ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded">
                  <div className="bg-green-500 h-2 rounded" style={{ width: `${percentage}%` }}></div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
