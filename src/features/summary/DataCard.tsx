import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  timeframe?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  change,
  trend,
  color,
  timeframe,
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 text-green-800';
      case 'red':
        return 'bg-red-50 text-red-800';
      case 'blue':
        return 'bg-blue-50 text-blue-800';
      case 'purple':
        return 'bg-purple-50 text-purple-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const getBadgeClasses = (trend: 'up' | 'down') => {
    return trend === 'up'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className={`rounded-lg p-6 ${getColorClasses(color)}`}>
      <div className="flex justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getBadgeClasses(trend)}`}
        >
          {trend === 'up' ? (
            <ArrowUpRight className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-1" />
          )}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {timeframe && <p className="text-xs mt-1 opacity-75">{timeframe}</p>}
    </div>
  );
};

export default DataCard;
