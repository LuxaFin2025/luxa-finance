import React, { useState } from 'react';
import { Plus, Calendar, ArrowRight } from 'lucide-react';
import { GoalCard } from '../shared/GoalCard';
import { mockGoals } from '../../data/mockData';

export const FinancialGoals: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const filteredGoals = mockGoals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'active') return goal.progress < 100;
    if (filter === 'completed') return goal.progress >= 100;
    return true;
  });

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Financial Goals</h2>
            <p className="text-gray-500">Track and manage your financial objectives</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All Goals
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg flex items-center min-w-[250px] mr-4">
            <div className="p-3 bg-blue-100 rounded-full mr-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Upcoming Goal</p>
              <p className="text-lg font-bold text-blue-800">Emergency Fund</p>
              <div className="flex items-center text-xs text-blue-600">
                <span>June 30, 2025</span>
                <ArrowRight className="h-3 w-3 mx-1" />
                <span>$10,000</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg flex items-center min-w-[250px]">
            <div className="p-3 bg-green-100 rounded-full mr-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Next Goal</p>
              <p className="text-lg font-bold text-green-800">Vacation Fund</p>
              <div className="flex items-center text-xs text-green-600">
                <span>December 15, 2025</span>
                <ArrowRight className="h-3 w-3 mx-1" />
                <span>$5,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};