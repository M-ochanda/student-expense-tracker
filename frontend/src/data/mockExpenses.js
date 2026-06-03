@'
export const mockExpenses = [
  {
    id: "exp-001",
    title: "Lunch",
    amount: 250,
    category: "Food",
    date: "2026-06-03",
    note: "Campus cafeteria"
  },
  {
    id: "exp-002",
    title: "Bus Fare",
    amount: 80,
    category: "Transport",
    date: "2026-06-03",
    note: "Town to campus"
  }
];
'@ | Set-Content src\data\mockExpenses.js
