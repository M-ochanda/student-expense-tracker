import { useState } from "react";

const CATEGORIES = [
  { label: "Food", icon: "🍽️", color: "#f97316" },
  { label: "Transport", icon: "🚌", color: "#3b82f6" },
  { label: "Airtime/Data", icon: "📱", color: "#8b5cf6" },
  { label: "School Supplies", icon: "📚", color: "#ec4899" },
  { label: "Entertainment", icon: "🎮", color: "#06b6d4" },
  { label: "Personal Care", icon: "🧴", color: "#10b981" },
  { label: "Other", icon: "📦", color: "#94a3b8" },
];

const getCategoryMeta = (label) =>
  CATEGORIES.find((c) => c.label === label) || CATEGORIES[6];

const initialExpenses = [
  { id: "exp-001", title: "Lunch", amount: 250, category: "Food", date: "2026-06-03", note: "Campus cafeteria" },
  { id: "exp-002", title: "Bus Fare", amount: 80, category: "Transport", date: "2026-06-03", note: "Town to campus" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

  body { font-family: 'Inter', sans-serif; background: #080a0f; color: #f8fafc; }

  .app-wrapper { min-height: 100vh; padding: 40px 20px; }
  .container { max-width: 1000px; margin: 0 auto; }

  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
  .header-left h1 { font-size: 2rem; font-weight: 700; color: #ffffff; }
  .header-left h1 span { color: #10b981; }
  .badge { background: #1a1f2b; padding: 8px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1px solid #334155; color: #e2e8f0; }

  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
  .stat-card { background: #0f1219; padding: 24px; border-radius: 16px; border: 1px solid #1e2530; }
  .stat-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .stat-value { font-size: 1.5rem; font-weight: 700; color: #ffffff; }

  .main-grid { display: grid; grid-template-columns: 350px 1fr; gap: 40px; }
  .panel { background: #0f1219; padding: 24px; border-radius: 16px; border: 1px solid #1e2530; }
  .panel-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 20px; color: #ffffff; }

  .form-input { width: 100%; padding: 12px; background: #080a0f; border: 1px solid #334155; border-radius: 8px; color: #ffffff; margin-bottom: 12px; }
  .cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px; }
  .cat-pill { padding: 10px 4px; border-radius: 8px; border: 1px solid #1e2530; background: #080a0f; cursor: pointer; color: #94a3b8; font-size: 0.65rem; }
  .cat-pill.active { border-color: #10b981; background: #064e3b; color: #ffffff; }

  .btn-submit { width: 100%; padding: 12px; border-radius: 8px; border: none; background: #ffffff; color: #000000; font-weight: 700; cursor: pointer; }
  
  .filter-tabs { margin-bottom: 20px; }
  .filter-tab { padding: 6px 16px; border-radius: 20px; border: 1px solid #1e2530; background: #080a0f; color: #94a3b8; cursor: pointer; margin-right: 8px; font-size: 0.8rem; }
  .filter-tab.active { background: #ffffff; color: #000000; }

  .expense-card { background: #0f1219; border: 1px solid #1e2530; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
  .cat-dot { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: #1a1f2b; }
  .expense-title { font-weight: 600; color: #ffffff; }
  .expense-date { font-size: 0.75rem; color: #64748b; }
  .expense-amount { font-weight: 700; color: #ffffff; margin-left: auto; }
  .delete-btn { background: none; border: none; color: #475569; cursor: pointer; margin-left: 12px; }
`;

export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [form, setForm] = useState({ title: "", amount: "", category: "Food", date: "", note: "" });
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.title || !form.amount || !form.date) return;
    setExpenses([{ id: `exp-${Date.now()}`, ...form, amount: Number(form.amount) }, ...expenses]);
    setForm({ title: "", amount: "", category: "Food", date: "", note: "" });
  };
  const handleDelete = (id) => setExpenses(expenses.filter((e) => e.id !== id));
  const filtered = filter === "All" ? expenses : expenses.filter((e) => e.category === filter);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        <div className="container">
          <div className="header">
            <div className="header-left"><h1>Student <span>Expense</span></h1></div>
            <div className="badge">🇰🇪 KES Currency</div>
          </div>

          <div className="stats-row">
            <div className="stat-card"><div className="stat-label">Total Spent</div><div className="stat-value">KES {totalSpent.toLocaleString()}</div></div>
            <div className="stat-card"><div className="stat-label">Transactions</div><div className="stat-value">{expenses.length}</div></div>
            <div className="stat-card"><div className="stat-label">Currency</div><div className="stat-value">Shilling</div></div>
          </div>

          <div className="main-grid">
            <div className="panel">
              <div className="panel-title">Add New</div>
              <div className="cat-grid">
                {CATEGORIES.map((c) => (
                  <button key={c.label} className={`cat-pill${form.category === c.label ? " active" : ""}`} onClick={() => setForm({...form, category: c.label})}>
                    {c.icon}<br />{c.label.split("/")[0]}
                  </button>
                ))}
              </div>
              <input className="form-input" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
              <input className="form-input" type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
              <input className="form-input" type="date" name="date" value={form.date} onChange={handleChange} />
              <button className="btn-submit" onClick={handleSubmit}>Add Expense</button>
            </div>

            <div>
              <div className="filter-tabs">
                {["All", ...CATEGORIES.map((c) => c.label)].map((cat) => (
                  <button key={cat} className={`filter-tab${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>
                ))}
              </div>
              {filtered.map((e) => (
                <div key={e.id} className="expense-card">
                  <div className="cat-dot">{getCategoryMeta(e.category).icon}</div>
                  <div>
                    <div className="expense-title">{e.title}</div>
                    <div className="expense-date">{e.date} • {e.category}</div>
                  </div>
                  <div className="expense-amount">KES {e.amount.toLocaleString()}</div>
                  <button className="delete-btn" onClick={() => handleDelete(e.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}