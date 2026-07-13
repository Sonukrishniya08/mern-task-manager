import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );
    const login = (newToken) => {
        localStorage.setItem(
            "token",
            newToken
        );
        setToken(newToken);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
    };
    const value = {
        token,
        isAuthenticated: !!token,
        login,
        logout
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}