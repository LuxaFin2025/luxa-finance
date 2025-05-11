import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function GoalForm() {
  const session = useSession();

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      setStatus("User not authenticated.");
      return;
    }

    if (!goalName || !targetAmount) {
      setStatus("Goal name and target amount are required.");
      return;
    }

    const { error } = await supabase.from("goal").insert({
      goal_name: goalName.trim(),
      target_amount: parseFloat(targetAmount),
      progress: 0,
      month: month.trim() || null,
      category: category.trim() || null,
      user_id: session.user.id,
    });

    if (error) {
      setStatus(`Error saving goal: ${error.message}`);
    } else {
      setStatus("Goal created successfully!");
      setGoalName("");
      setTargetAmount("");
      setMonth("");
      setCategory("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Add New Goal</h2>
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
                       p-2 w-full rounded
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-all duration-300 ease-in-out"
            required
          />
        </div>

        {/* Target Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Target Amount (₹)
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-black dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       p-2 w-full rounded
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-all duration-300 ease-in-out"
            required
          />
        </div>

        {/* Month Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Month (optional)
          </label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="e.g. May"
            className="border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-black dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       p-2 w-full rounded
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category (optional)
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Travel, Emergency"
            className="border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-black dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       p-2 w-full rounded
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition-all duration-300 ease-in-out"
        >
          Save Goal
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
