import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [loading, setLoading] = useState(true);

  // Sync token, role, user, and name with local storage when they change
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  // Axios interceptor to add token to request headers
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Clean up interceptor on unmount
    return () => axios.interceptors.request.eject(interceptor);
  }, [token]);

  // Login action to authenticate and store user details
  const loginAction = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:1000/get-started/login", data);
      if (response.status === 200) {
        const { role, token, user } = response.data;

        // Update state and local storage
        setToken(token);
        setRole(role);
        setUser(user);
        setName(user.fullName);

        // Store the logged-in status
        localStorage.setItem("status", "true");

        setLoading(false);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
      setLoading(false);
    }
  };

  // Logout action to clear user session
  const logOut = () => {
    setToken("");
    setRole("");
    setUser(null);
    setName("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.setItem("status", "false");
  };

  return (
    <AuthContext.Provider value={{ token, user, role, name, loginAction, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
