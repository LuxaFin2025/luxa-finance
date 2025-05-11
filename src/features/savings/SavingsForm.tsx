import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function SavingsForm({ onSaveSuccess }: { onSaveSuccess?: () => void }) {
  const session = useSession();
  const [goalName, setGoalName] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      setStatus("User not authenticated.");
      return;
    }

    const { data: goals, error: fetchError } = await supabase
      .from("goal")
      .select("progress")
      .ilike("goal_name", goalName.trim())
      .eq("user_id", session.user.id)
      .single();

    if (fetchError || !goals) {
      setStatus("Goal not found.");
      return;
    }

    const newProgress = (goals.progress || 0) + parseFloat(amount);

    const { error: updateError } = await supabase
      .from("goal")
      .update({ progress: newProgress, month })
      .ilike("goal_name", goalName.trim())
      .eq("user_id", session.user.id);

    if (updateError) {
      setStatus(`Failed to update goal: ${updateError.message}`);
      return;
    }

    const { error: insertError } = await supabase
      .from("savings")
      .insert([
        {
          user_id: session.user.id,
          goal_name: goalName.trim(),
          amount: parseFloat(amount),
          month,
          note: "Added via SavingsForm",
        },
      ]);

    if (insertError) {
      setStatus("Goal updated, but failed to save in savings table.");
    } else {
      setStatus("Savings added successfully!");
      setGoalName("");
      setAmount("");
      setMonth("");
      if (onSaveSuccess) onSaveSuccess();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-6 shadow mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Add Savings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Goal Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Goal Name
          </label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-black dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       p-2 w-full rounded focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 
                       focus:border-transparent transition-all duration-300 ease-in-out"
            required
          />
        </div>

        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-black dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       p-2 w-full rounded focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 
                       focus:border-transparent transition-all duration-300 ease-in-out"
            required
          />
        </div>

        {/* Month Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Month
          </label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-black dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       p-2 w-full rounded focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 
                       focus:border-transparent transition-all duration-300 ease-in-out"
            placeholder="e.g. May"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition-all duration-300 ease-in-out"
        >
          Save Savings
        </button>

        {/* Status Message */}
        {status && (
          <p className="text-sm text-center mt-2 text-gray-700 dark:text-gray-300 transition-opacity duration-500">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
