import { createContext, useContext, useState, useEffect } from 'react';
import { authApi, getToken, setToken, clearToken } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    authApi.me()
      .then(({ user }) => setUser(user))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { token, user } = await authApi.login(email, password);
    setToken(token);
    setUser(user);
    return user;
  };

  const register = async (data) => {
    const { token, user } = await authApi.register(data);
    setToken(token);
    setUser(user);
    return user;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const refresh = async () => {
    const { user } = await authApi.me();
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth musi być użyty w <AuthProvider>');
  return ctx;
}
