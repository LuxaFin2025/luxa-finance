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

    // ✅ Case-insensitive goal name matching
    const { data: goals, error: fetchError } = await supabase
      .from("goal")
      .select("progress")
      .ilike("goal_name", goalName.trim())
      .eq("user_id", session.user.id)
      .single();

    if (fetchError || !goals) {
      setStatus("⚠ Goal not found.");
      return;
    }

    const newProgress = (goals.progress || 0) + parseFloat(amount);

    const { error: updateError } = await supabase
      .from("goal")
      .update({ progress: newProgress, month })
      .ilike("goal_name", goalName.trim())
      .eq("user_id", session.user.id);

    if (updateError) {
      setStatus("❌ Failed to update goal: " + updateError.message);
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
      setStatus("⚠ Goal updated, but failed to save in savings table.");
    } else {
      setStatus("✅ Savings added successfully!");
      setGoalName("");
      setAmount("");
      setMonth("");
      if (onSaveSuccess) onSaveSuccess();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Add Monthly Savings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Goal Name</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Month</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. May"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
