function App() {
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
          maxWidth: "900px",
          margin: "0 auto",
          background: "#1e293b",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ color: "#93c5fd", marginBottom: "10px" }}>
          Student Expense Tracker
        </h1>
        <p style={{ marginBottom: "30px", lineHeight: "1.6" }}>
          A simple web app for tracking daily student expenses, categories, and
          spending summaries.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#334155",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h3>Dashboard</h3>
            <p>Weekly and monthly totals will appear here.</p>
          </div>

          <div
            style={{
              background: "#334155",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h3>Add Expense</h3>
            <p>The expense form will be added next.</p>
          </div>

          <div
            style={{
              background: "#334155",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <h3>Expense List</h3>
            <p>Your saved expenses will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;