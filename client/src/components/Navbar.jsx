import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

function Navbar() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();
    const dispatch = useDispatch();

    const darkMode = useSelector(
        (state) => state.theme.darkMode
    );
    const handleLogout = () => {
        logout();
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
                            className="theme-toggle"
                            type="button"
                            onClick={() => dispatch(toggleTheme())}
                        >
                            <span className="theme-icon">
                                {darkMode ? "☀️" : "🌙"}
                            </span>
                            <span>
                                {darkMode ? "Light" : "Dark"}
                            </span>
                        </button>

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