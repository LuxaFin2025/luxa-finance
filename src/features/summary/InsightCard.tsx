import { LineChart, Line, ResponsiveContainer } from "recharts";

interface InsightCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  positiveMessage: string;
  negativeMessage: string;
  isPositive: boolean;
  chartData?: { value: number }[];  // 🆕 Optional
}

function InsightCard({
  title,
  value,
  prefix = "",
  suffix = "",
  positiveMessage,
  negativeMessage,
  isPositive,
  chartData,
}: InsightCardProps) {
  const safeChartData = Array.isArray(chartData) && chartData.length > 0 ? chartData : null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all space-y-2">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</h2>

      {/* 🔥 Value + Sparkline */}
      <div className="flex items-center space-x-2">
        <p className={`text-3xl font-extrabold transition-all duration-500 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}>
          {prefix}
          {value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          {suffix}
        </p>

        {/* 📈 Sparkline Chart */}
        {safeChartData && (
          <div className="w-20 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={safeChartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#22c55e" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Message */}
      <p className="text-sm text-gray-500 dark:text-gray-400">{isPositive ? positiveMessage : negativeMessage}</p>
    </div>
  );
}
export default InsightCard;
