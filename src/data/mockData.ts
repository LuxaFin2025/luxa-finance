export const mockExpenses = [
  {
    id: '1',
    date: '2025-01-15',
    category: 'Housing',
    description: 'Monthly Rent',
    amount: 2000,
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '2',
    date: '2025-01-16',
    category: 'Utilities',
    description: 'Electricity Bill',
    amount: 150,
    paymentMethod: 'Credit Card'
  },
  {
    id: '3',
    date: '2025-01-17',
    category: 'Groceries',
    description: 'Weekly Groceries',
    amount: 200,
    paymentMethod: 'Debit Card'
  }
];

export const mockIncomes = [
  {
    id: '1',
    date: '2025-01-01',
    source: 'Employer',
    description: 'Monthly Salary',
    amount: 5000,
    category: 'Salary'
  },
  {
    id: '2',
    date: '2025-01-05',
    source: 'Freelance',
    description: 'Web Development Project',
    amount: 1000,
    category: 'Freelance'
  },
  {
    id: '3',
    date: '2025-01-10',
    source: 'Investments',
    description: 'Dividend Payment',
    amount: 300,
    category: 'Investment'
  }
];

export const mockInvestments = [
  {
    id: '1',
    name: 'Tech Growth Fund',
    type: 'Mutual Fund',
    initialValue: 10000,
    currentValue: 12500,
    returns: 25,
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    name: 'S&P 500 ETF',
    type: 'ETF',
    initialValue: 15000,
    currentValue: 17250,
    returns: 15,
    lastUpdated: '2025-01-15'
  },
  {
    id: '3',
    name: 'Blue Chip Portfolio',
    type: 'Stocks',
    initialValue: 20000,
    currentValue: 22000,
    returns: 10,
    lastUpdated: '2025-01-15'
  }
];

export const mockBudgetCategories = [
  {
    id: '1',
    name: 'Housing',
    budgeted: 2000,
    spent: 1800,
    color: 'blue'
  },
  {
    id: '2',
    name: 'Transportation',
    budgeted: 500,
    spent: 450,
    color: 'green'
  },
  {
    id: '3',
    name: 'Food & Dining',
    budgeted: 800,
    spent: 900,
    color: 'red'
  },
  {
    id: '4',
    name: 'Entertainment',
    budgeted: 300,
    spent: 250,
    color: 'purple'
  }
];

export const mockGoals = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6000,
    deadline: '2025-06-30',
    progress: 60,
    color: 'blue'
  },
  {
    id: '2',
    name: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 2500,
    deadline: '2025-12-15',
    progress: 50,
    color: 'green'
  },
  {
    id: '3',
    name: 'New Car',
    targetAmount: 25000,
    currentAmount: 5000,
    deadline: '2026-06-30',
    progress: 20,
    color: 'purple'
  },
  {
    id: '4',
    name: 'Home Down Payment',
    targetAmount: 50000,
    currentAmount: 15000,
    deadline: '2027-01-01',
    progress: 30,
    color: 'amber'
  }
];