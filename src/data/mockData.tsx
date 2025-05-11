export const mockExpenses = [
  {
    id: '1', date: '2024-01-05', category: 'Food', description: 'Groceries', amount: 75.50, paymentMethod: 'Credit Card'
  },
  {
    id: '2', date: '2024-01-04', category: 'Entertainment', description: 'Movie Night', amount: 25.00, paymentMethod: 'Debit Card'
  },
  {
    id: '3', date: '2024-01-03', category: 'Utilities', description: 'Electricity Bill', amount: 120.00, paymentMethod: 'Bank Transfer'
  },
  {
    id: '4', date: '2024-01-02', category: 'Transportation', description: 'Gasoline', amount: 45.00, paymentMethod: 'Credit Card'
  },
  {
    id: '5', date: '2024-01-01', category: 'Rent', description: 'Apartment Rent', amount: 1500.00, paymentMethod: 'Bank Transfer'
  },
];

export const mockIncomes = [
  {
    id: '1', date: '2024-01-15', source: 'Salary', description: 'Monthly Salary', amount: 5000.00, paymentMethod: 'Bank Transfer'
  },
  {
    id: '2', date: '2024-01-10', source: 'Freelance', description: 'Web Development Project', amount: 750.00, paymentMethod: 'PayPal'
  },
  {
    id: '3', date: '2024-01-05', source: 'Investment', description: 'Stock Dividends', amount: 200.00, paymentMethod: 'Brokerage Account'
  },
];

export const mockInvestments = [
  {
    id: '1', name: 'Tech Stocks', initialValue: 5000, currentValue: 5625, interestRate: 0.08
  },
  {
    id: '2', name: 'Bonds', initialValue: 10000, currentValue: 10350, interestRate: 0.035
  },
  {
    id: '3', name: 'Real Estate', initialValue: 150000, currentValue: 165000, interestRate: 0.10
  },
];

export const mockBudgetCategories = [
  {
    id: '1', name: 'Housing', budgeted: 1500, spent: 1350, color: '#0088FE'
  },
  {
    id: '2', name: 'Food', budgeted: 700, spent: 620, color: '#00C49F'
  },
  {
    id: '3', name: 'Transportation', budgeted: 300, spent: 280, color: '#FFBB28'
  },
  {
    id: '4', name: 'Entertainment', budgeted: 200, spent: 150, color: '#FF8042'
  },
  {
    id: '5', name: 'Utilities', budgeted: 250, spent: 230, color: '#8884d8'
  },
  {
    id: '6', name: 'Savings', budgeted: 500, spent: 0, color: '#d0ed57'
  },
];

export const mockGoals = [
  {
    id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 6000, deadline: '2024-12-31', progress: 60, color: '#0088FE'
  },
  {
    id: '2', name: 'Down Payment', targetAmount: 50000, currentAmount: 25000, deadline: '2025-06-30', progress: 50, color: '#00C49F'
  },
  {
    id: '3', name: 'Retirement', targetAmount: 1000000, currentAmount: 300000, deadline: '2050-12-31', progress: 30, color: '#FFBB28'
  },
];