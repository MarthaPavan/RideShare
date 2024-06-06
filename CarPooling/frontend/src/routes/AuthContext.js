import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(localStorage.getItem("name") || null);

  useEffect(() => {
    // Setup axios interceptor
    axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }, [token]);

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:1000/get-started/login", { ...data });
      if (response.status === 200) {
        const { role, token, user } = response.data;
        setToken(token);
        setRole(role);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", user.fullName);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logOut = () => {
    setToken("");
    setUser(null);
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ token, user, role, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
