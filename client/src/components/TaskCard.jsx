import "./TaskCard.css";

function TaskCard({ task, onEdit, onDelete }) {
    const formatDate = (date) => {
        if (!date) return "No Due Date";
        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };
    return (
        <div className="task-card">
            <div className="task-border"></div>
            <div className="task-content">
                <div className="task-top">
                    <div className="task-left">
                        <h3 className="task-title">
                            {task.title}
                        </h3>
                        <p className="task-description">
                            {task.description || "No description"}
                        </p>
                        <div className="task-date">
                            📅 Due: {formatDate(task.dueDate)}
                        </div>
                    </div>
                    <div className="task-right">
                        <span className={`status ${task.status}`}>
                            {task.status.toUpperCase()}
                        </span>
                        <span className={`priority ${task.priority}`}>
                            {task.priority.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="task-buttons">
                    <button
                        className="edit-btn"
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(task._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;