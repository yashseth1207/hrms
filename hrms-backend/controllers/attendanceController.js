const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// MARK ATTENDANCE
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find employee by custom employeeId (EMP001)
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status
    });

    res.status(201).json(attendance);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Attendance already marked" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// GET ATTENDANCE BY EMPLOYEE
const getAttendanceByEmployee = async (req, res) => {
  try {
    // Find employee using custom employeeId (EMP001)
    const employee = await Employee.findOne({
      employeeId: req.params.employeeId
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Use MongoDB _id to fetch attendance
    const attendance = await Attendance.find({
      employee: employee._id
    }).sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  markAttendance,
  getAttendanceByEmployee
};