
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      setError(err.message || 'Error');
    }
  };
  return (
    <form onSubmit={submit} style={{ maxWidth: 360 }}>
      <h2>Entrar</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%', margin:'6px 0' }}/>
      <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:'100%', margin:'6px 0' }}/>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <button>Login</button>
    </form>
  );
}
