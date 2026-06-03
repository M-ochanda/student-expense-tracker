import { useEffect, useState } from "react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Airtime/Data",
  "School Supplies",
  "Entertainment",
  "Personal Care",
  "Other",
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

  * { box-sizing: border-box; }

  body {
    font-family: 'Inter', sans-serif;
    background: #080a0f;
    color: #f8fafc;
    margin: 0;
  }

  .app-wrapper {
    min-height: 100vh;
    padding: 40px 20px;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    gap: 20px;
    flex-wrap: wrap;
  }

  .header-left h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .header-left h1 span {
    color: #10b981;
  }

  .badge {
    background: #1a1f2b;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    border: 1px solid #334155;
    color: #e2e8f0;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }

  .stat-card {
    background: #0f1219;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #1e2530;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 40px;
  }

  .panel {
    background: #0f1219;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #1e2530;
  }

  .panel-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #ffffff;
  }

  .form-input {
    width: 100%;
    padding: 12px;
    background: #080a0f;
    border: 1px solid #334155;
    border-radius: 8px;
    color: #ffffff;
    margin-bottom: 12px;
    outline: none;
  }

  .form-input::placeholder {
    color: #64748b;
  }

  .cat-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 20px;
  }

  .cat-pill {
    padding: 10px 4px;
    border-radius: 8px;
    border: 1px solid #1e2530;
    background: #080a0f;
    cursor: pointer;
    color: #94a3b8;
    font-size: 0.7rem;
    transition: 0.2s ease;
  }

  .cat-pill.active {
    border-color: #10b981;
    background: #064e3b;
    color: #ffffff;
  }

  .btn-submit {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background: #ffffff;
    color: #000000;
    font-weight: 700;
    cursor: pointer;
    margin-top: 6px;
  }

  .btn-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .helper-text {
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 10px;
  }

  .filter-tabs {
    margin-bottom: 20px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .filter-tab {
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid #1e2530;
    background: #080a0f;
    color: #94a3b8;
    cursor: pointer;
    font-size: 0.8rem;
    transition: 0.2s ease;
  }

  .filter-tab.active {
    background: #ffffff;
    color: #000000;
  }

  .expense-card {
    background: #0f1219;
    border: 1px solid #1e2530;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
  }

  .expense-title {
    font-weight: 600;
    color: #ffffff;
  }

  .expense-date {
    font-size: 0.75rem;
    color: #64748b;
  }

  .expense-note {
    font-size: 0.75rem;
    color: #94a3b8;
    margin-top: 4px;
  }

  .expense-amount {
    font-weight: 700;
    color: #ffffff;
    margin-left: auto;
    white-space: nowrap;
  }

  .action-btn {
    background: none;
    border: none;
    color: #475569;
    cursor: pointer;
    margin-left: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    transition: 0.2s ease;
  }

  .action-btn:hover {
    color: #ffffff;
  }

  .action-btn.delete:hover {
    color: #ef4444;
  }

  .action-btn.edit:hover {
    color: #3b82f6;
  }

  .empty-state {
    background: #0f1219;
    border: 1px dashed #334155;
    border-radius: 12px;
    padding: 24px;
    color: #94a3b8;
    text-align: center;
  }

  .error-state {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.35);
    border-radius: 12px;
    padding: 16px;
    color: #fecaca;
    margin-bottom: 16px;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: #0f1219;
    border: 1px solid #1e2530;
    border-radius: 16px;
    padding: 32px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: #ffffff;
  }

  .modal-buttons {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .btn-save {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background: #3b82f6;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .btn-save:hover {
    background: #2563eb;
  }

  .btn-cancel {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #334155;
    background: transparent;
    color: #e2e8f0;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .btn-cancel:hover {
    border-color: #64748b;
    color: #ffffff;
  }

  @media (max-width: 900px) {
    .stats-row,
    .main-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/expenses");
      if (!response.ok) {
        throw new Error("Failed to load expenses.");
      }

      const data = await response.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Could not load expenses from the server.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanTitle = form.title.trim();
    const cleanNote = form.note.trim();
    const cleanAmount = Number(form.amount);

    if (!cleanTitle || !cleanAmount || cleanAmount <= 0 || !form.date) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: cleanTitle,
          amount: cleanAmount,
          category: form.category,
          date: form.date,
          note: cleanNote
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create expense.");
      }

      const created = await response.json();
      setExpenses([created, ...expenses]);

      setForm({
        title: "",
        amount: "",
        category: "Food",
        date: "",
        note: "",
      });
    } catch (err) {
      alert("Could not save expense.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const cleanTitle = editForm.title.trim();
    const cleanNote = editForm.note.trim();
    const cleanAmount = Number(editForm.amount);

    if (!cleanTitle || !cleanAmount || cleanAmount <= 0 || !editForm.date) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      setSubmitting(true);

      const expense = expenses.find((ex) => ex.id === editingId);

      const response = await fetch(`/api/expenses/${editingId}?category=${encodeURIComponent(expense.category)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: cleanTitle,
          amount: cleanAmount,
          category: editForm.category,
          date: editForm.date,
          note: cleanNote
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update expense.");
      }

      const updated = await response.json();
      setExpenses(expenses.map((e) => (e.id === editingId ? updated : e)));

      setEditingId(null);
      setEditForm({
        title: "",
        amount: "",
        category: "Food",
        date: "",
        note: "",
      });
    } catch (err) {
      alert("Could not update expense.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      title: expense.title,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date,
      note: expense.note,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      title: "",
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });
  };

  const handleDelete = async (expense) => {
    try {
      const response = await fetch(`/api/expenses/${expense.id}?category=${encodeURIComponent(expense.category)}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense.");
      }

      setExpenses(expenses.filter((e) => e.id !== expense.id));
    } catch (err) {
      alert("Could not delete expense.");
    }
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <>
      <style>{styles}</style>

      <div className="app-wrapper">
        <div className="container">
          <div className="header">
            <div className="header-left">
              <h1>
                Student <span>Expense</span>
              </h1>
            </div>
            <div className="badge">🇰🇪 KES Currency</div>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-label">Total Spent</div>
              <div className="stat-value">KES {totalSpent.toLocaleString()}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Transactions</div>
              <div className="stat-value">{expenses.length}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Currency</div>
              <div className="stat-value">Shilling</div>
            </div>
          </div>

          <div className="main-grid">
            <div className="panel">
              <div className="panel-title">Add New</div>

              <div className="cat-grid">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-pill${form.category === cat ? " active" : ""}`}
                    onClick={() => setForm({ ...form, category: cat })}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-input"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                />

                <input
                  className="form-input"
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={handleChange}
                />

                <input
                  className="form-input"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />

                <textarea
                  className="form-input"
                  name="note"
                  placeholder="Optional note"
                  value={form.note}
                  onChange={handleChange}
                  rows="3"
                />

                <button className="btn-submit" type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : "Add Expense"}
                </button>
              </form>

              <div className="helper-text">
                This version reads and writes data through your live /api backend.
              </div>
            </div>

            <div>
              <div className="filter-tabs">
                {["All", ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-tab${filter === cat ? " active" : ""}`}
                    onClick={() => setFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {loading && (
                <div className="empty-state">Loading expenses...</div>
              )}

              {error && !loading && (
                <div className="error-state">{error}</div>
              )}

              {!loading && !error && filteredExpenses.length === 0 && (
                <div className="empty-state">
                  No expenses found for <strong>{filter}</strong>.
                </div>
              )}

              {!loading &&
                !error &&
                filteredExpenses.map((e) => (
                  <div key={e.id} className="expense-card">
                    <div>
                      <div className="expense-title">{e.title}</div>
                      <div className="expense-date">
                        {e.date} • {e.category}
                      </div>
                      {e.note && <div className="expense-note">{e.note}</div>}
                    </div>

                    <div className="expense-amount">
                      KES {Number(e.amount).toLocaleString()}
                    </div>

                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(e)}
                      type="button"
                    >
                      EDIT
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(e)}
                      type="button"
                    >
                      DELETE
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {editingId && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Edit Expense</div>

            <div className="cat-grid">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-pill${editForm.category === cat ? " active" : ""}`}
                  onClick={() => setEditForm({ ...editForm, category: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>

            <form onSubmit={handleEditSubmit}>
              <input
                className="form-input"
                name="title"
                placeholder="Title"
                value={editForm.title}
                onChange={handleEditChange}
              />

              <input
                className="form-input"
                type="number"
                name="amount"
                placeholder="Amount"
                value={editForm.amount}
                onChange={handleEditChange}
              />

              <input
                className="form-input"
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleEditChange}
              />

              <textarea
                className="form-input"
                name="note"
                placeholder="Optional note"
                value={editForm.note}
                onChange={handleEditChange}
                rows="3"
              />

              <div className="modal-buttons">
                <button className="btn-save" type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
                <button className="btn-cancel" type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
