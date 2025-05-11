import React from 'react';
import { Plus } from 'lucide-react';
import { BudgetCategoryCard } from '../shared/BudgetCategoryCard';
import { BudgetSummaryChart } from '../shared/BudgetSummaryChart';
import { mockBudgetCategories } from '../../data/mockData';

export const BudgetPlanning: React.FC = () => {
  const totalBudget = mockBudgetCategories.reduce((sum, category) => sum + category.budgeted, 0);
  const totalSpent = mockBudgetCategories.reduce((sum, category) => sum + category.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">June 2025 Budget</h2>
            <p className="text-gray-500">Budget planning and tracking</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4 mr-1" />
              Add Category
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Budget</h3>
            <p className="text-2xl font-bold text-blue-800">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 mb-1">Total Spent</h3>
            <p className="text-2xl font-bold text-red-800">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-1">Remaining</h3>
            <p className="text-2xl font-bold text-green-800">${remainingBudget.toLocaleString()}</p>
          </div>
        </div>

        <BudgetSummaryChart categories={mockBudgetCategories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBudgetCategories.map((category) => (
          <BudgetCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};