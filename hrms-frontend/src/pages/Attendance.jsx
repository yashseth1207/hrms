import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function Attendance() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // ✅ LOCAL date (YYYY-MM-DD) — no timezone issue
  const today = new Date().toLocaleDateString("en-CA");

  const fetchAttendance = () => {
    setLoading(true);
    setError("");

    api
      .get(`/attendance/${employeeId}`)
      .then((res) => {
        setAttendance(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load attendance");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAttendance();
  }, [employeeId]);

  // ✅ Mark attendance using LOCAL date
  const markAttendance = async () => {
    try {
      await api.post("/attendance", {
        employeeId,
        date: today,
        status,
      });

      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  const presentCount = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  // ✅ Disable button if attendance already exists for today
  const alreadyMarkedToday = attendance.some(
    (a) => a.date === today
  );

  // ✅ Filter attendance by selected date
  const filteredAttendance = filterDate
    ? attendance.filter((a) => a.date === filterDate)
    : attendance;

  return (
    <div>
      <button onClick={() => navigate("/employees")}>⬅ Back</button>

      <h2>Attendance for {employeeId}</h2>

      <p>
        <strong>Total Present Days:</strong> {presentCount}
      </p>

      {/* Date Filter */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Filter by date:{" "}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>

        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            style={{ marginLeft: "10px" }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Attendance Marking */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button
        onClick={markAttendance}
        style={{ marginLeft: "10px" }}
        disabled={alreadyMarkedToday}
      >
        {alreadyMarkedToday ? "Already Marked Today" : "Mark Attendance"}
      </button>

      {alreadyMarkedToday && (
        <p style={{ color: "gray" }}>
          Attendance for today has already been recorded.
        </p>
      )}

      <hr />

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Attendance List */}
      {filteredAttendance.length === 0 ? (
        <p>
          {filterDate
            ? "No attendance for selected date"
            : "No attendance records"}
        </p>
      ) : (
        <ul>
          {filteredAttendance
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((a) => (
              <li key={a._id}>
                {new Date(a.date + "T00:00:00").toDateString()} —{" "}
                <strong
                  style={{
                    color:
                      a.status === "Present" ? "green" : "red",
                  }}
                >
                  {a.status}
                </strong>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Attendance;