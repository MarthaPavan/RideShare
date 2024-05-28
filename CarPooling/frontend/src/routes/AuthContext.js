import React, { useContext, useState, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    const loginAction = async (data) => {
        try {
            const response = await axios.post("http://localhost:1000/get-started/login", { ...data });
            if (response.data.status === "success" && response.status === 200) {
                setToken(response.data.token);
                setUser(response.data.user);

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.user.role);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logOut = () => {
        setToken("");
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
