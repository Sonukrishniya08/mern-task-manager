const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());

const taskRoutes = require("./routes/taskRoutes");
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes);
app.use(errorMiddleware);

module.exports = app;