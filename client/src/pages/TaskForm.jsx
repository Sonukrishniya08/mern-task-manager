import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTaskById, createTask, updateTask} = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo"
  });
  const [originalData, setOriginalData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);
  const fetchTask = async () => {
    try {
      const task = await getTaskById(id);
      const formattedTask = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
        priority: task.priority,
        status: task.status
      };
      setFormData(formattedTask);
      setOriginalData(formattedTask);
    }
    catch (error) {
      console.log(error);
    }
  };
  const isChanged =
    originalData
      ?
      (
        formData.title !== originalData.title ||
        formData.description !== originalData.description ||
        formData.dueDate !== originalData.dueDate ||
        formData.priority !== originalData.priority ||
        formData.status !== originalData.status
      )
      :
      true;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }
    if (id && !isChanged) {
      return;
    }
    try {
      setLoading(true);
      if (id) {
        await updateTask( id, formData );
        toast.success("Task Updated Successfully!");
      }
      else {
        await createTask(formData);
        toast.success("Task Created Successfully!");
      }
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        status: "todo"
      });
      navigate("/dashboard");
    }
    catch (err) {
      if (err.response?.status !== 401) {
        const message =
          err.response?.data?.message ||
          "Unable to save task.";
        setError(message);
        toast.error(message);
      }
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-container">
      <form
        className="task-form-card"
        onSubmit={handleSubmit}
      >
        <h1>
          {id ? "Edit Task" : "Create New Task"}
        </h1>
        {error && <p className="error">{error}</p>}
        <label>Title *</label>
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          rows="5"
          name="description"
          placeholder="Add details (optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="row">
          <div className="field">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="field">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <div className="button-group">
          <button
            className="save-btn"
            type="submit"
            disabled={loading || (id && !isChanged)}
          >
            {
              loading
                ? "Saving..."
                : id
                  ? "Update Task"
                  : "Create Task"
            }
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;