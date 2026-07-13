import {
    createContext,
    useContext,
    useState
} from "react";

import { toast } from "react-toastify";

import {
    getTasks,
    getTaskById as getTaskByIdService,
    createTask as createTaskService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService
} from "../services/taskService";

const TaskContext = createContext();

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchTasks = async (params = {}) => {
        try {
            setLoading(true);
            const response =
                await getTasks(params);
            setTasks(response.data);
            setError("");
        }
        catch (err) {
            const message =
                err.response?.data?.message ||
                "Unable to fetch tasks.";
            setError(message);
            toast.error(message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const getTaskById = async (id) => {

        const response =
            await getTaskByIdService(id);

        return response.data;

    };

    const createTask = async (taskData) => {

        const response =
            await createTaskService(taskData);

        return response.data;

    };

    const updateTask = async (
        id,
        taskData
    ) => {

        const response =
            await updateTaskService(
                id,
                taskData
            );

        return response.data;

    };
    const deleteTask = async (id, params = {}) => {
        try {
            await deleteTaskService(id);
            toast.success("Task Deleted Successfully!");
            await fetchTasks(params);
        }
        catch (err) {
            const message =
                err.response?.data?.message ||
                "Unable to delete task.";
            toast.error(message);
            throw err;
        }
    };
    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                fetchTasks,
                getTaskById,
                createTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}