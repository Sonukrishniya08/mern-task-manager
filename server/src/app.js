const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

const taskRoutes = require("./routes/taskRoutes");
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes);

module.exports = app;