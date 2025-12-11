
// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RescuerPanel from './pages/RescuerPanel.jsx';
import AdopterPanel from './pages/AdopterPanel.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Stories from './pages/Stories.jsx';
import './App.css';

function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const roles = user?.roles || [];
  return (
    <div>
      <header style={{ padding: 12, borderBottom: '1px solid #ddd', display: 'flex', gap: 12 }}>
        <Link to="/">KATZE</Link>
        <Link to="/stories">Historias</Link>
        {roles.includes('rescatista') && <Link to="/rescuer">Rescatista</Link>}
        {roles.includes('adoptante') && <Link to="/adopter">Adoptante</Link>}
        {roles.includes('admin') && <Link to="/admin">Admin</Link>}
        <span style={{ marginLeft: 'auto' }}>
          {user ? (
            <>
              <strong>{user.name}</strong> &nbsp;
              <button onClick={logout}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register" style={{ marginLeft: 8 }}>Registro</Link>
            </>
          )}
        </span>
      </header>
      <main style={{ padding: 16 }}>{children}</main>
    </div>
  );
}

function RequireRole({ role, children }) {
  const { user } = useContext(AuthContext);
  if (!user || !user.roles?.includes(role)) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rescuer" element={<RequireRole role="rescatista"><RescuerPanel /></RequireRole>} />
          <Route path="/adopter" element={<RequireRole role="adoptante"><AdopterPanel /></RequireRole>} />
          <Route path="/admin" element={<RequireRole role="admin"><AdminPanel /></RequireRole>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
