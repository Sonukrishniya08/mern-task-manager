import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();
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
            const response = await registerUser(formData);
            toast.success("Registration Successful!");

            navigate("/");
            
        }
        catch (err) {
            if (err.response?.status !== 401) {
                toast.error(
                    err.response?.data?.message ||
                    "Registration Failed."
                );
            }
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
                <h1>Create Account</h1>
                <p>Register to continue</p>
                {
                    error &&

                    <p className="error">

                        {error}

                    </p>
                }
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
                    minLength={6}
                    pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$"
                    title="Password must be at least 6 characters and contain at least one special character (!@#$%^&*)"
                    required
                />
                <button type="submit">
                    {
                        loading

                            ?
                            "Creating Account..."
                            :
                            "Register"
                    }
                </button>
                <p className="link-text">
                    Already have an account?
                    {" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
export default Register;