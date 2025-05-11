import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

interface Goal {
  goal_name: string;
  progress: number;
  target_amount: number;
}

export default function GoalTracker() {
  const session = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!session?.user?.id) return;

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
    <div className="space-y-4">
      {goals.length === 0 ? (
        <p className="text-sm text-gray-500">No goals found.</p>
      ) : (
        goals.map((goal) => {
          const percentage = Math.min(100, Math.round((goal.progress / goal.target_amount) * 100));

          return (
            <div key={goal.goal_name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm">{goal.goal_name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ₹{goal.progress} / ₹{goal.target_amount} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
