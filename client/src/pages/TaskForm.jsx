import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);
  const fetchTask = async () => {
    try {
      const response =
        await API.get("/tasks");
      const task =
        response.data.find(
          task => task._id === id
        );
      if (task) {
        setFormData({
          title:
            task.title,
          description:
            task.description,
          dueDate:
            task.dueDate
              ?
              task.dueDate.substring(0, 10)
              :
              "",
          priority:
            task.priority,
          status:
            task.status
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  };
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
    try {
      setLoading(true);
      if (id) {
        await API.put(
          `/tasks/${id}`,
          formData
        );
      }
      else {
        await API.post(
          "/tasks",
          formData
        );
      }
      if (id) {
        alert("Task Updated Successfully!");
      } else {
        alert("Task Created Successfully!");
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
      setError(
        err.response?.data?.message ||
        "Unable to create task."
      );
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-container">
      <form
        className="card"
        onSubmit={handleSubmit}
      >
        <h1>
          {
            id
              ?
              "Edit Task"
              :
              "Create Task"
          }
        </h1>
        {
          error &&
          <p className="error">
            {error}
          </p>
        }
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">
            Low
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="high">
            High
          </option>
        </select>
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="todo">
            Todo
          </option>
          <option value="in-progress">
            In Progress
          </option>
          <option value="done">
            Done
          </option>
        </select>
        <button
          type="submit"
        >
          {
            loading
              ? "Saving..."
              : id
                ? "Update Task"
                : "Save Task"
          }
        </button>
      </form>
    </div>
  );
}

export default TaskForm;