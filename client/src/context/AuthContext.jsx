import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('food_mfg_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('food_mfg_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('food_mfg_token');
      if (storedToken) {
        try {
          const res = await fetch('http://localhost:5000/auth/me', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('food_mfg_user', JSON.stringify(data.user));
          } else {
            logout();
          }
        } catch (err) {
          console.error('Failed to verify token:', err);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password, requiredRole = null) => {
    try {
      const payload = { username, password };
      if (requiredRole) payload.requiredRole = requiredRole;

      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('food_mfg_token', data.token);
      localStorage.setItem('food_mfg_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const registerUser = async (formData) => {
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('food_mfg_token', data.token);
      localStorage.setItem('food_mfg_user', JSON.stringify(data.user));
      return { success: true, user: data.user, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const loginWithGoogle = async (googleProfile) => {
    try {
      const res = await fetch('http://localhost:5000/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleProfile),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('food_mfg_token', data.token);
      localStorage.setItem('food_mfg_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('food_mfg_token');
    localStorage.removeItem('food_mfg_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        role: user?.role || null,
        login,
        registerUser,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
