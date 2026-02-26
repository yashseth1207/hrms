const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getAttendanceByEmployee
} = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/:employeeId", getAttendanceByEmployee);

module.exports = router;