import React from "react";
interface Props { income: number; expense: number; }
export default function IncomeExpenseCards({ income, expense }: Props) {
  return <div className="grid grid-cols-2 gap-4">
    <div className="bg-green-100 p-4 rounded">Income: ₹{income}</div>
    <div className="bg-red-100 p-4 rounded">Expense: ₹{expense}</div>
  </div>;
}
