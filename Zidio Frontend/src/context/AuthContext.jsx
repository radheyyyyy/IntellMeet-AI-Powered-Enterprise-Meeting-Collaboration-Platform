import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem("intellmeet_access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch {
      localStorage.removeItem("intellmeet_access_token");
      localStorage.removeItem("intellmeet_refresh_token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUser(); }, []);

  const signIn = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    localStorage.setItem("intellmeet_access_token", data.accessToken);
    localStorage.setItem("intellmeet_refresh_token", data.refreshToken);
    setUser(data.user);
    return data;
  };

  const signUp = async (payload) => {
    const { data } = await api.post("/auth/signup", payload);
    return data;
  };

  const signOut = async () => {
    try { await api.post("/auth/logout"); } catch { /* local logout still succeeds */ }
    localStorage.removeItem("intellmeet_access_token");
    localStorage.removeItem("intellmeet_refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
