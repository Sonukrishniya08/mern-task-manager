const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
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

        next(error);

    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const { status, priority, sort } = req.query;
        const query = {
            user: req.user.id
        };
        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }
        let tasksQuery = Task.find(query);
        if (sort === "asc") {
            tasksQuery = tasksQuery.sort({
                dueDate: 1
            });
        }
        else if (sort === "desc") {
            tasksQuery = tasksQuery.sort({
                dueDate: -1
            });
        }
        const tasks = await tasksQuery;
        res.json(tasks);
    }
    catch (error) {

        next(error);

    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(
            req.params.id
        );
        if (!task) {
            const error = new Error("Task Not Found");
            error.statusCode = 404;
            return next(error);
        }
        if (
            task.user.toString() !==
            req.user.id
        ) {
            const error = new Error("Access Denied");
            error.statusCode = 403;
            return next(error);
        }
        res.json(task);
    } catch (error) {

        next(error);

    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(
            req.params.id
        );
        if (!task) {
            const error = new Error("Task Not Found");
            error.statusCode = 404;
            return next(error);
        }
        if (
            task.user.toString() !==
            req.user.id
        ) {
            const error = new Error("Access Denied");
            error.statusCode = 403;
            return next(error);
        }
        const updatedTask =
            await Task.findByIdAndUpdate(

                req.params.id,

                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
        res.json(updatedTask);
    } catch (error) {

        next(error);

    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(
            req.params.id
        );
        if (!task) {
            const error = new Error("Task Not Found");
            error.statusCode = 404;
            return next(error);
        }
        if (
            task.user.toString() !==
            req.user.id
        ) {
            const error = new Error("Access Denied");
            error.statusCode = 403;
            return next(error);
        }
        await Task.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Task Deleted Successfully"
        });
    } catch (error) {

        next(error);

    }
};