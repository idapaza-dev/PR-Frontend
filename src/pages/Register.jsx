
import React, { useState } from 'react';
import { registerApi } from '../api/katze';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'adoptante' });
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await registerApi(form);
    setMsg(res?.id ? 'Registro OK, ahora entra con login.' : 'Error en registro');
  };
  return (
    <form onSubmit={submit} style={{ maxWidth: 440 }}>
      <h2>Registro</h2>
      <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{ width:'100%', margin:'6px 0' }}/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{ width:'100%', margin:'6px 0' }}/>
      <input placeholder="Contraseña" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} style={{ width:'100%', margin:'6px 0' }}/>
      <label>Rol inicial:</label>
      <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} style={{ width:'100%', margin:'6px 0' }}>
        <option value="adoptante">Adoptante</option>
        <option value="rescatista">Rescatista</option>
      </select>
      {msg && <p>{msg}</p>}
      <button>Crear cuenta</button>
    </form>
  );
}
