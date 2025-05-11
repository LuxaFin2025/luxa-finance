import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function BudgetCategoryCard() {
  const [data, setData] = useState([]);
  const session = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchCategoryData = async () => {
      const { data, error } = await supabase
        .from("budget")
        .select("category, amount")
        .eq("user_id", session.user.id);

      if (!error && data) {
        const grouped = data.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
          return acc;
        }, {} as Record<string, number>);

        const formatted = Object.entries(grouped).map(([category, amount]) => ({
          category,
          amount,
        }));

        setData(formatted);
      }
    };

    fetchCategoryData();
  }, [session]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-all duration-300 ease-in-out">
      <h2 className="text-md font-semibold mb-3">📂 Category-wise Budget</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-purple-100 dark:bg-purple-900 p-3 rounded shadow-sm"
          >
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
              {item.category}
            </h3>
            <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
              ₹{item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
