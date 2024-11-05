import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const STORAGE_KEYS = {
  TOKEN: 'token',
  ROLE: 'role',
  USER: 'user',
  NAME: 'name',
  STATUS: 'status'
};

const AuthProvider = ({ children }) => {
  const getStoredValue = (key, defaultValue = '') => {
    try {
      if (key === STORAGE_KEYS.USER) {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
      }
      return localStorage.getItem(key) || defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const [authState, setAuthState] = useState({
    token: getStoredValue(STORAGE_KEYS.TOKEN),
    role: getStoredValue(STORAGE_KEYS.ROLE),
    user: getStoredValue(STORAGE_KEYS.USER),
    name: getStoredValue(STORAGE_KEYS.NAME),
    loading: false,
    isAuthenticated: !!getStoredValue(STORAGE_KEYS.TOKEN) // Add authenticated flag
  });

  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:1000";

  // Synchronize localStorage
  const updateLocalStorage = (newState) => {
    try {
      Object.entries(newState).forEach(([key, value]) => {
        if (key === 'user') {
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(value));
        } else if (STORAGE_KEYS[key.toUpperCase()]) {
          localStorage.setItem(STORAGE_KEYS[key.toUpperCase()], value?.toString() || '');
        }
      });
      localStorage.setItem(STORAGE_KEYS.STATUS, newState.token ? 'true' : 'false');
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  };

  // Update localStorage when auth state changes
  useEffect(() => {
    updateLocalStorage(authState);
  }, [authState]);

  // Set up axios interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (authState.token) {
          config.headers.Authorization = `Bearer ${authState.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, [authState.token]);

  // Improved login action with proper state management
  const loginAction = async (data) => {
    if (authState.loading) return { success: false, error: 'Login in progress' };

    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      const response = await axios.post(`${base_url}/get-started/login`, data);

      if (response.status === 200) {
        const { role, token, user } = response.data;

        const newAuthState = {
          token,
          role,
          user,
          name: user.fullName,
          loading: false,
          isAuthenticated: true
        };

        setAuthState(newAuthState);
        updateLocalStorage(newAuthState);

        return { success: true, data: response.data };
      }

      throw new Error(response.data?.message || "Login failed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      setAuthState(prev => ({ 
        ...prev, 
        loading: false,
        isAuthenticated: false 
      }));
      return { success: false, error: errorMessage };
    }
  };

  const logOut = () => {
    const emptyState = {
      token: '',
      role: '',
      user: null,
      name: '',
      loading: false,
      isAuthenticated: false
    };
    
    setAuthState(emptyState);
    updateLocalStorage(emptyState);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState,
        loginAction,
        logOut,
        isAuthenticated: authState.isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };