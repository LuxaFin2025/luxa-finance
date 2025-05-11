import React from 'react';
import  DataCard  from '../shared/DataCard';
import { SavingsChart } from '../shared/SavingsChart';
import { InvestmentTable } from '../shared/InvestmentTable';
import { mockInvestments } from '../../data/mockData';

export const SavingsInvestments: React.FC = () => {
  // Calculate totals
  const totalInvestments = mockInvestments.reduce((sum, investment) => sum + investment.currentValue, 0);
  const totalGrowth = mockInvestments.reduce((sum, investment) => sum + (investment.currentValue - investment.initialValue), 0);
  const growthPercentage = (totalGrowth / (totalInvestments - totalGrowth) * 100).toFixed(1);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DataCard
          title="Total Investments"
          value={`$${totalInvestments.toLocaleString()}`}
          change="+12.5%"
          trend="up"
          color="blue"
        />
        <DataCard
          title="Total Growth"
          value={`$${totalGrowth.toLocaleString()}`}
          change={`+${growthPercentage}%`}
          trend="up"
          color="green"
        />
        <DataCard
          title="Monthly Contribution"
          value="$1,500.00"
          change="+$500"
          trend="up"
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Savings Growth</h2>
        <SavingsChart />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Investment Portfolio</h2>
        <InvestmentTable investments={mockInvestments} />
      </div>
    </div>
  );
};