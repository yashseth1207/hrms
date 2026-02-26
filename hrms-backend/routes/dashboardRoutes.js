const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

// GET dashboard summary
router.get("/summary", async (req, res) => {
  try {
    const today = new Date().toLocaleDateString("en-CA");

    const totalEmployees = await Employee.countDocuments();
    const totalAttendance = await Attendance.countDocuments();
    const presentToday = await Attendance.countDocuments({
      date: today,
      status: "Present",
    });

    res.json({
      totalEmployees,
      totalAttendance,
      presentToday,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;