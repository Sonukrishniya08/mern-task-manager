import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value

        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {

            setError("Please fill all fields.");

            return;
        }
        try {
            setLoading(true);
            const response = await loginUser(formData);
            login(response.data.token);
            navigate("/dashboard");
        } 
        catch (err) {
            if (err.response?.status !== 401) {
                toast.error(
                    err.response?.data?.message ||
                    "Login Failed."
                );
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="page-container">
            <form
                className="card"
                onSubmit={handleSubmit}
            >
                <h1>Welcome Back</h1>
                <p>Login to continue</p>
                {error && (
                    <p className="error">

                        {error}

                    </p>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                />

                <button type="submit">
                    {
                        loading

                            ?

                            "Logging in..."
                            :
                            "Login"
                    }
                </button>
                <p className="link-text">
                    Don't have an account?
                    {" "}
                    <Link to="/register">
                        Register

                    </Link>

                </p>
            </form>
        </div>
    );
}

export default Login;