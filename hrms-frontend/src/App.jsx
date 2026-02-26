import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";

function App() {
  const navigate = useNavigate(); 

  return (
    <div className="container">
      <h1>HRMS Lite</h1>

      <nav className="nav">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/employees")}>Employees</button>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance/:employeeId" element={<Attendance />} />
      </Routes>
    </div>
  );
}

export default App;
