const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===================== MIDDLEWARE ===================== */

app.use(cors());
app.use(express.json());

/* ===================== ROUTES ===================== */

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const feeRoutes = require("./routes/feeRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const examRoutes = require("./routes/examRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const seedRoutes = require("./routes/seedRoutes");

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/admission", admissionRoutes);
app.use("/fees", feeRoutes);
app.use("/hostel", hostelRoutes);
app.use("/library", libraryRoutes);
app.use("/exam", examRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/seed", seedRoutes);

/* ===================== HEALTH CHECK ===================== */

app.get("/", (req, res) => {
res.send("ERP Backend API Running");
});

module.exports = app;
