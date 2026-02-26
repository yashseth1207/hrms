import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AddEmployeeForm from "../components/AddEmployeeForm";

function Employees() {
  // ✅ Hook MUST be inside the component
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = () => {
    setLoading(true);
    api
      .get("/employees")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load employees");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AddEmployeeForm onEmployeeAdded={fetchEmployees} />

      <h2>Employees</h2>

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp._id} style={{ marginBottom: "10px" }}>
              {emp.fullName} — {emp.department}

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => navigate(`/attendance/${emp.employeeId}`)}
              >
                Attendance
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={async () => {
                  if (window.confirm("Delete this employee?")) {
                    await api.delete(`/employees/${emp._id}`);
                    fetchEmployees();
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Employees;