import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function BudgetSummaryChart() {
  const [data, setData] = useState([]);
  const session = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("budget")
        .select("month, amount")
        .eq("user_id", session.user.id);

      if (!error && data) {
        const grouped = data.reduce((acc, curr) => {
          acc[curr.month] = (acc[curr.month] || 0) + curr.amount;
          return acc;
        }, {} as Record<string, number>);

        const formatted = Object.entries(grouped).map(([month, total]) => ({
          month,
          amount: total,
        }));

        setData(formatted);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-md font-semibold mb-2">📅 Monthly Budget Summary</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#7C3AED" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
