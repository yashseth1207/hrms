import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/dashboard/summary")
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Employees</h3>
          <p>{summary.totalEmployees}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Attendance</h3>
          <p>{summary.totalAttendance}</p>
        </div>

        <div style={cardStyle}>
          <h3>Present Today</h3>
          <p>{summary.presentToday}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "6px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  minWidth: "180px",
  textAlign: "center",
};

export default Dashboard;