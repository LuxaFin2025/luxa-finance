import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

interface Props {
  category: BudgetCategory;
}

export const BudgetCategoryCard: React.FC<Props> = ({ category }) => {
  const percentage = Math.round((category.spent / category.budgeted) * 100);
  const remaining = category.budgeted - category.spent;
  const isOverBudget = remaining < 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          <p className="text-sm text-gray-500">Monthly Budget</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Spent: ${category.spent.toLocaleString()}</span>
            <span className="text-gray-600">Budget: ${category.budgeted.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${
                isOverBudget ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Remaining</p>
            <p className={`text-lg font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              ${Math.abs(remaining).toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Spent</p>
            <p className="text-lg font-semibold text-gray-800">{percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};