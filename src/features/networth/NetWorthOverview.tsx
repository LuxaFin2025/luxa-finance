import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function NetWorthOverview() {
  const session = useSession();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;
      const { data, error } = await supabase
        .from("net_worth")
        .select("*")
        .eq("user_id", session.user.id);
      if (!error) setData(data);
    };
    fetchData();
  }, [session]);

  const assets = data.filter((d) => d.type === "asset");
  const liabilities = data.filter((d) => d.type === "liability");

  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  const pieData = [
    { name: "Assets", value: totalAssets },
    { name: "Liabilities", value: totalLiabilities },
  ];
  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-xl font-bold">📐 Net Worth Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Assets" value={totalAssets} color="green" />
        <SummaryCard title="Total Liabilities" value={totalLiabilities} color="red" />
        <SummaryCard title="Net Worth" value={netWorth} color="blue" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">Assets vs Liabilities</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colorMap: any = {
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };

  return (
    <div className={`p-4 rounded shadow ${colorMap[color]}`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-2xl font-bold">₹{value.toLocaleString()}</p>
    </div>
  );
}
