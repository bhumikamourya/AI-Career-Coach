require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db
connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/skill-gap", require("./routes/skillGapRoutes"));
app.use("/api/roadmap", require("./routes/roadmapRoutes"));
app.use ("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/resume-builder", require("./routes/resumeBuilderRoutes"));
app.use("/api/practice", require("./routes/practiceRoutes"));

// test
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});