import React, { useState } from 'react';
import { PlusCircle, Filter, Download, Upload } from 'lucide-react';
import { ExpenseTable } from '../shared/ExpenseTable';
import { IncomeTable } from '../shared/IncomeTable';
import SpendingChart from '../shared/SpendingChart';
import Forecasting from '../tabs/Forecasting';
import IncomeForm from '../Forms/IncomeForm';
import ExpenseForm from '../Forms/ExpenseForm';

export const IncomeExpenses: React.FC = () => {
  const [activeView, setActiveView] = useState<'expenses' | 'income'>('expenses');
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div>
      {/* View Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-medium rounded-md transition ${
            activeView === 'expenses' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setActiveView('expenses')}
        >
          Expenses
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-md transition ${
            activeView === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setActiveView('income')}
        >
          Income
        </button>
      </div>

      {/* Add + Table */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        {activeView === 'expenses' ? (
          <>
            <ExpenseForm onAdd={(e) => setExpenses([...expenses, e])} />
            <ExpenseTable expenses={expenses} />
          </>
        ) : (
          <>
            <IncomeForm onAdd={(i) => setIncomes([...incomes, i])} />
            <IncomeTable incomes={incomes} />
          </>
        )}
      </div>

      {/* Spending Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Spending</h2>
        <SpendingChart />
      </div>

      {/* Forecast Section */}
      <Forecasting incomes={incomes} expenses={expenses} />
    </div>
  );
};
