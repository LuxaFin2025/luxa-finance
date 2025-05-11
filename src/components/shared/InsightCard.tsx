import React from 'react';
import { Lightbulb, AlertTriangle, LineChart, TrendingUp } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  actionText?: string;
  icon?: 'bulb' | 'alert' | 'chart' | 'graph';
  color?: 'green' | 'amber' | 'blue' | 'purple';
}

const iconMap = {
  bulb: Lightbulb,
  alert: AlertTriangle,
  chart: LineChart,
  graph: TrendingUp,
};

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  actionText,
  icon = 'bulb',
  color = 'green',
}) => {
  const IconComponent = iconMap[icon];

  return (
    <div className={`rounded-lg p-6 bg-${color}-50 text-${color}-800`}>
      <div className="flex items-start space-x-3 mb-2">
        <IconComponent className="w-5 h-5 mt-1" />
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="text-xs">{description}</p>
        </div>
      </div>
      {actionText && (
        <button className={`text-sm font-medium underline text-${color}-800`}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default InsightCard;
