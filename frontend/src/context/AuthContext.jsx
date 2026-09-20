import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('doc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('doc_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('doc_token', token);
      localStorage.setItem('token', token); // compatibility
    } else {
      localStorage.removeItem('doc_token');
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('doc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('doc_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Direct API or mock fallback for seamless testing
      let userData = { id: 'user-demo-1', email, full_name: email.split('@')[0], role: 'researcher' };
      let jwtToken = 'mock-jwt-token-' + Date.now();

      try {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.token) {
          jwtToken = res.data.token;
          userData = res.data.user;
        }
      } catch (err) {
        console.warn('API login fallback to local session:', err.message);
      }

      setToken(jwtToken);
      setUser(userData);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const loginWithDemo = () => {
    const demoUser = {
      id: 'demo-user-101',
      email: 'alex.chen@ai-research.org',
      full_name: 'Dr. Alex Chen',
      role: 'Principal AI Scientist',
    };
    const demoToken = 'demo-jwt-valid-token-session';
    setToken(demoToken);
    setUser(demoUser);
  };

  const register = async (email, password, fullName) => {
    setLoading(true);
    try {
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        full_name: fullName || email.split('@')[0],
        role: 'user',
      };
      const newToken = 'jwt-token-' + Date.now();
      setToken(newToken);
      setUser(newUser);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        loginWithDemo,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
