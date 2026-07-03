import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TaskCard from "../components/TaskCard";
import API from "../api/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get("/tasks");
      setTasks(response.data);
    }
    catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to fetch tasks."
      );
    }
    finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="page-container">

        <h2>Fetching your tasks...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="page-container">
        <h2 className="error">
          {error}
        </h2>
      </div>
    );
  }
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task Deleted Successfully!");
      fetchTasks();
    }
    catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Unable to delete task."
      );
    }
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <h1>
          Welcome Back
        </h1>
        <p>
          Manage your daily work efficiently.
        </p>
        <button
          className="create-btn"
          onClick={() =>
            navigate("/task")
          }
        >
          + Create Task
        </button>
      </div>
      {
        tasks.length === 0 ?
          (
            <div className="empty-state">
              <h3>No Tasks Yet 🚀</h3>
              <p>
                Click "Create Task" to add your first task.
              </p>
            </div>
          )
          :
          (
            <div className="task-grid">

              {

                tasks.map((task) => (

                  <TaskCard

                    key={task._id}

                    task={task}

                    onEdit={() =>
                      navigate(`/task/${task._id}`)
                    }

                    onDelete={deleteTask}

                  />

                ))

              }

            </div>
          )
      }
    </div>
  );
}

export default Dashboard;