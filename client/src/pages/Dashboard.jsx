import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import DeleteModal from "../components/DeleteModal";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const { tasks, loading, error, fetchTasks, deleteTask } = useTasks();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {

    fetchTasks(buildQueryParams());

  }, [
    statusFilter,
    priorityFilter,
    sortOrder,
  ]);

  const buildQueryParams = () => {
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
    return params;
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
  const openDeleteModal = (id) => {
    setSelectedTaskId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteTask(
        selectedTaskId,
        buildQueryParams()
      );
    }
    catch (err) {

      console.error(err);

    }
    finally {
      setShowDeleteModal(false);
      setSelectedTaskId(null);
    }
  };
  const searchedTasks = tasks.filter((task) => {

    return task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  });
  const clearAllFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortOrder("asc");
  };
  const filtersChanged =
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    sortOrder !== "asc"
    ;
  const hasSearch = searchTerm.trim() !== "";

  const hasFilters =
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    sortOrder !== "asc"
    ;
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">

        <div className="dashboard-title">

          <h1 className="welc">
            Welcome Back
          </h1>

          <p>
            Manage your daily work efficiently.
          </p>

        </div>

        <div className="dashboard-actions">

          <div className="search-box">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
            {
              searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  type="button"
                >
                  ✕
                </button>
              )
            }
          </div>
          <button
            className="create-btn"
            onClick={() => navigate("/task")}
          >
            + Create Task
          </button>

        </div>

      </div>

      <FilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        totalTasks={tasks.length}
        filteredCount={searchedTasks.length}
      />
      {
        searchedTasks.length === 0 ?
          (
            <div className="empty-state">

              <h3>🔍 No Tasks Found</h3>

              <p>
                {
                  hasSearch && hasFilters
                    ? "No task matches your current search and filters."
                    : hasSearch
                      ? "No task matches your search."
                      : "No task matches the selected filters."
                }
              </p>

              {hasSearch && !hasFilters && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              )}

              {!hasSearch && hasFilters && (
                <button
                  className="clear-filter-btn"
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </button>
              )}

              {hasSearch && hasFilters && (
                <button
                  className="clear-filter-btn"
                  onClick={() => {
                    setSearchTerm("");
                    clearAllFilters();
                  }}
                >
                  Reset All
                </button>
              )}

            </div>
          )
          :
          (
            <div className="task-grid">

              {

                searchedTasks.map((task) => (

                  <TaskCard

                    key={task._id}

                    task={task}

                    onEdit={() =>
                      navigate(`/task/${task._id}`)
                    }

                    onDelete={openDeleteModal}

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