const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status,
            user: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(
            req.params.id
        );
        if (!task) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }
        if (
            task.user.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(
            req.params.id
        );
        if (!task) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }
        if (
            task.user.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }
        const updatedTask =
        await Task.findByIdAndUpdate(

            req.params.id,

            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(
            req.params.id
        );
        if (!task) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }
        if (
            task.user.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }
        await Task.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Task Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};