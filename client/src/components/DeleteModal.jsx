function DeleteModal({
    isOpen,
    onClose,
    onConfirm
}) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="delete-modal">
                <h2>Delete Task</h2>
                <p>
                    Are you sure you want to delete this task?
                    <br />
                    This action cannot be undone.
                </p>
                <div className="modal-buttons">
                    <button
                        className="cancel-delete-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="confirm-delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;