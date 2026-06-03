import { useState } from "react";
import { mockExpenses } from "./data/mockExpenses";

function App() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.date) {
      alert("Please fill in title, amount, and date.");
      return;
    }

    const newExpense = {
      id: `exp-${Date.now()}`,
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note,
    };

    setExpenses([newExpense, ...expenses]);

    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#1e293b",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ color: "#93c5fd" }}>Student Expense Tracker</h1>
        <p>Track your daily expenses in one place.</p>

        <div
          style={{
            background: "#334155",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        >
          <h2>Total Spent</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            KES {totalSpent}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          <div
            style={{
              background: "#334155",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Expense title"
                value={form.title}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                style={inputStyle}
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Airtime/Data</option>
                <option>School Supplies</option>
                <option>Entertainment</option>
                <option>Personal Care</option>
                <option>Other</option>
              </select>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                style={inputStyle}
              />
              <textarea
                name="note"
                placeholder="Optional note"
                value={form.note}
                onChange={handleChange}
                style={{ ...inputStyle, minHeight: "80px" }}
              />
              <button type="submit" style={buttonStyle}>
                Save Expense
              </button>
            </form>
          </div>

          <div
            style={{
              background: "#334155",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            <h2>Expense List</h2>
            {expenses.length === 0 ? (
              <p>No expenses yet.</p>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  style={{
                    background: "#1e293b",
                    padding: "15px",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <strong>{expense.title}</strong>
                  <p>KES {expense.amount}</p>
                  <p>{expense.category}</p>
                  <p>{expense.date}</p>
                  {expense.note && <p>{expense.note}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "none",
  boxSizing: "border-box", // Ensures padding doesn't affect width
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#93c5fd",
  color: "#0f172a",
  fontWeight: "bold",
  cursor: "pointer",
};

export default App;