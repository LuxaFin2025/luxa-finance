import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  progress: number;
  color: string;
}

interface Props {
  goal: Goal;
}

export const GoalCard: React.FC<Props> = ({ goal }) => {
  const remaining = goal.targetAmount - goal.currentAmount;
  const deadlineDate = new Date(goal.deadline);
  const isCompleted = goal.progress >= 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{goal.name}</h3>
          <p className="text-sm text-gray-500">Target: ${goal.targetAmount.toLocaleString()}</p>
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
            <span className="text-gray-600">Current: ${goal.currentAmount.toLocaleString()}</span>
            <span className="text-gray-600">{goal.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.min(goal.progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-lg font-semibold text-gray-800">
              ${Math.max(remaining, 0).toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Deadline</p>
            <p className="text-lg font-semibold text-gray-800">
              {deadlineDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};