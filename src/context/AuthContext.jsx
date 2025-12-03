import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("chat_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("chat_token"));

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("chat_user", JSON.stringify(data.user));
    localStorage.setItem("chat_token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("chat_user");
    localStorage.removeItem("chat_token");
  };

  const value = { user, token, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
