// hooks/useAuth.ts

import React, { useState, useEffect, createContext, useContext } from 'react';

import ApiService from '../services/ApiService';

/* ========== Typen ========== */

export interface User {

  id: string;

  email: string;

}

interface AuthCtx {

  user: User | null;

  login: (email: string, password: string) => Promise<void>;

  register: (email: string, password: string) => Promise<void>;

  logout: () => void;

}

/* ========== Context anlegen ========== */

const AuthContext = createContext<AuthCtx | null>(null);

export const useAuth = () => useContext(AuthContext)!;

/* ========== Provider ========== */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({

  children,

}) => {

  const [user, setUser] = useState<User | null>(null);

  /* ▸ beim Laden prüfen, ob es noch ein eingeloggtes User-Objekt gibt  */

  useEffect(() => {

    const stored = localStorage.getItem('user');

    if (stored) setUser(JSON.parse(stored));

  }, []);

  /* ---------- Login ---------- */

  const login = async (email: string, password: string) => {

    const { data } = await ApiService.post('/login', { email, password });

    localStorage.setItem('token', data.token);

    localStorage.setItem('user', JSON.stringify(data.user));

    setUser(data.user);

  };

  /* ---------- Registrierung ---------- */

  const register = async (email: string, password: string) => {

    await ApiService.post('/register', { email, password });

    // direkt einloggen, damit der neue User gleich authentifiziert ist

    await login(email, password);

  };

  /* ---------- Logout ---------- */

  const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    setUser(null);

  };

  /* ---------- Provider-Wrapper ---------- */

  const value: AuthCtx = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};
 