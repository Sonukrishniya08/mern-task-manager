function TaskForm() {
  return (
    <div className="page-container">

      <div className="card">

        <h1>Create Task</h1>

        <input
          type="text"
          placeholder="Task Title"
        />

        <textarea
          placeholder="Description"
        ></textarea>

        <button>
          Save Task
        </button>

      </div>

    </div>
  );
}

export default TaskForm;