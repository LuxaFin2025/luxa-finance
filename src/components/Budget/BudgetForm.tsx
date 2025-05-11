import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function BudgetForm() {
  const session = useSession();

  const [category, setCategory] = useState("");
  const [planned, setPlanned] = useState("");
  const [spent, setSpent] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      setStatus("User not authenticated.");
      return;
    }

    const { error } = await supabase.from("budget").insert([
      {
        user_id: session.user.id,
        category,
        amount: parseFloat(planned),
        spent: parseFloat(spent),
        month,
      },
    ]);

    if (error) {
      setStatus("❌ Failed to save: " + error.message);
    } else {
      setStatus("✅ Budget saved successfully!");
      setCategory("");
      setPlanned("");
      setSpent("");
      setMonth("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Budget Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. Rent, Food"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Planned Budget (₹)</label>
          <input
            type="number"
            value={planned}
            onChange={(e) => setPlanned(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Spent (₹)</label>
          <input
            type="number"
            value={spent}
            onChange={(e) => setSpent(e.target.value)}
            className="w-full p-2 border rounded"
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
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Budget
        </button>

        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
