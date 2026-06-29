import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      fetchTasks();
    }
    catch (err) {
      alert(
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
                  <div
                    key={task._id}
                    className="task-card"
                  >
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <span
                        className={`status ${task.status?.toLowerCase()}`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="description">
                      {task.description}
                    </p>
                    <div className="task-footer">
                      <span className="priority">
                        Priority:
                        {" "}
                        {task.priority}
                      </span>
                      {
                        task.dueDate && (
                          <span>
                            Due:
                            {" "}
                            {
                              new Date(task.dueDate)
                                .toLocaleDateString()
                            }
                          </span>
                        )
                      }
                    </div>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/task/${task._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteTask(task._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          )
      }
    </div>
  );
}

export default Dashboard;