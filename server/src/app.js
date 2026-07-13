const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");

const helmet = require("helmet");

const app = express();
app.use(cors());

const taskRoutes = require("./routes/taskRoutes");
app.use(express.json());

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

app.use(limiter);

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);
app.use(helmet());

module.exports = app;