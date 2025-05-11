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
      setStatus("❌ You must be logged in.");
      return;
    }

    if (!goalName || !targetAmount) {
      setStatus("⚠ Goal name and target amount are required.");
      return;
    }

    const { error } = await supabase.from("goal").insert({
      goal_name: goalName,
      target_amount: parseFloat(targetAmount),
      progress: 0,
      month: month || null,
      category: category || null,
      user_id: session.user.id,
    });

    if (error) {
      setStatus("❌ Error saving goal: " + error.message);
    } else {
      setStatus("✅ Goal created successfully!");
      setGoalName(""); setTargetAmount(""); setMonth(""); setCategory("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mt-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create a New Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Goal Name</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="w-full p-2 rounded border"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Target Amount (₹)</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full p-2 rounded border"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Month (optional)</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="e.g. May"
            className="w-full p-2 rounded border"
          />
        </div>
        <div>
          <label className="block text-sm">Category (optional)</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Travel, Emergency"
            className="w-full p-2 rounded border"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Goal
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
