import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TaskCard from "../components/TaskCard";
import DeleteModal from "../components/DeleteModal";
import API from "../api/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {

    fetchTasks();

  }, [

    statusFilter,

    priorityFilter,

    sortOrder

  ]);
  const fetchTasks = async () => {

    try {

      setLoading(true);

      const params = {};

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      if (priorityFilter !== "all") {
        params.priority = priorityFilter;
      }

      if (sortOrder) {
        params.sort = sortOrder;
      }

      const response = await API.get(
        "/tasks",
        {
          params
        }
      );

      setTasks(response.data);

    }
    catch (err) {
      if (err.response?.status !== 401) {
        const message =
          err.response?.data?.message ||
          "Failed to fetch tasks.";
        setError(message);
        toast.error(message);
      }
    }

    finally {

      setLoading(false);

    }

  };
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-box">
          <div className="loader"></div>
          <p>Loading your tasks...</p>
        </div>
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
  const deleteTask = (id) => {
    setSelectedTaskId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await API.delete(`/tasks/${selectedTaskId}`);
      toast.success("Task Deleted Successfully!");
      fetchTasks();
    }

    catch (err) {
      if (err.response?.status !== 401) {
        toast.error(
          err.response?.data?.message ||
          "Unable to delete task."
        );
      }
    }

    finally {
      setShowDeleteModal(false);
      setSelectedTaskId(null);
    }
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">

        <div>

          <h1 className="welc">Welcome Back</h1>

          <p>Manage your daily work efficiently.</p>

        </div>

        <button
          className="create-btn"
          onClick={() => navigate("/task")}
        >
          + Create Task
        </button>

      </div>

      <div className="filter-section">

        <div className="filter-toolbar">

          <h3 className="filter-title">
            Filter By
          </h3>

          <div className="filter-group">

            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

          </div>

          <div className="filter-group">

            <label>Priority</label>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

          </div>

          <div className="filter-group">

            <label>Sort By</label>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>

          </div>

          <div className="task-counter">

            Showing <strong>{tasks.length}</strong> of{" "}
            <strong>{tasks.length}</strong> Tasks

          </div>

        </div>

      </div>
      {
        tasks.length === 0 ?
          (
            <div className="empty-state">
              <h3>No Tasks Found</h3>
              <p>
                No task matches the selected filters.
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
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTaskId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Dashboard;