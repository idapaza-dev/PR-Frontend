
// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { loginApi } from '../api/katze';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, roles, verifiedRescuer, token }

  useEffect(() => {
    const saved = localStorage.getItem('katze_auth');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    const auth = { name: data.name, roles: data.roles, verifiedRescuer: data.verifiedRescuer, token: data.token };
    localStorage.setItem('katze_auth', JSON.stringify(auth));
    setUser(auth);
    return true;
  };

  const logout = () => { localStorage.removeItem('katze_auth'); setUser(null); };

  return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>;
}
