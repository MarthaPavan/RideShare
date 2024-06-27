import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const [name,setName] = useState(localStorage.getItem('name')||"");
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

    return () => axios.interceptors.request.eject(interceptor);
  }, [token]);

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:1000/get-started/login", data);
      if (response.status === 200) {
        const { role, token, user } = response.data;
        setToken(token);
        setRole(role);
        setUser(user);
        setName(user.fullName);
        console.log(name);
        localStorage.setItem("token", token);
        localStorage.setItem("name",name);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("status", true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logOut = () => {
    setToken("");
    setRole("");
    setUser(null);
    setName("");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.setItem("status", false);
  };

  return (
    <AuthContext.Provider value={{ token, user, role, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
