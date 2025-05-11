import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function NetWorthForm() {
  const session = useSession();
  const [type, setType] = useState("Asset");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return setStatus("User not logged in");

    const normalizedType = type.trim().toLowerCase(); // asset/liability

    const { error } = await supabase.from("net_worth").insert({
      user_id: session.user.id,
      type: normalizedType,
      category,
      amount: parseFloat(amount),
      month: currentMonth,
    });

    if (error) {
      console.error(error);
      setStatus("Failed to save data.");
    } else {
      setCategory("");
      setAmount("");
      setStatus("Saved successfully!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Add Net Worth Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-black dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       p-2 w-full rounded
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-transparent transition-all duration-300 ease-in-out"
          >
            <option value="Asset">Asset</option>
            <option value="Liability">Liability</option>
          </select>
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition-all duration-300 ease-in-out"
        >
          Add Entry
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
