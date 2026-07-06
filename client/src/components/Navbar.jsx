import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleLogout = () => {

        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <nav className="navbar">
            <h2>Task Manager</h2>
            <div className="nav-links">
                {!token ? (
                    <>
                        <Link to="/">Login</Link>
                        <Link to="/register">Register</Link>

                    </>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        {/* <Link to="/task">Create Task</Link> */}
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;