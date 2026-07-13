function FilterBar({
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortOrder,
    setSortOrder,
    totalTasks,
    filteredCount,
}) {
    return (
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

                    {
                        totalTasks === 0
                            ? (
                                <span>No Tasks Found</span>
                            )
                            : filteredCount === 0
                                ? (
                                    <span>No Matching Tasks</span>
                                )
                                : filteredCount === totalTasks
                                    ? (
                                        <span>Showing All {totalTasks} Tasks</span>
                                    )
                                    : (
                                        <span>
                                            Showing {filteredCount} of {totalTasks} Tasks
                                        </span>
                                    )
                    }

                </div>

            </div>

        </div>
    );
}

export default FilterBar;