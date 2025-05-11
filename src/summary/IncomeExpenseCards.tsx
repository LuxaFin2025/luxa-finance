import React from 'react';

interface IncomeExpenseCardsProps {
  income: number;
  expense: number;
}

const IncomeExpenseCards: React.FC<IncomeExpenseCardsProps> = ({ income, expense }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium">Total Income</h3>
        <p className="text-xl font-bold">₹ {income.toLocaleString()}</p>
      </div>
      <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium">Total Expense</h3>
        <p className="text-xl font-bold">₹ {expense.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default IncomeExpenseCards;
