
import React, { useEffect, useState } from 'react';
import { adminListUsers, adminApproveRescuer } from '../api/katze.js';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => setUsers(await adminListUsers());
  useEffect(() => { loadUsers(); }, []);

  const approve = async (id) => {
    try {
      await adminApproveRescuer(id);
      alert('Rescatista verificado');
      loadUsers();
    } catch (e) { alert(`Error: ${e.message}`); }
  };

  return (
    <div>
      <h2>Panel Admin (KATZE)</h2>
      <h3>Usuarios</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} — roles: {(u.roles || []).join(', ')} — verificado: {u.verifiedRescuer ? '✅' : '❌'}
            {!u.verifiedRescuer && (u.roles || []).includes('rescatista') && (
              <button onClick={() => approve(u._id)} style={{ marginLeft: 8 }}>Verificar rescatista</button>
            )}
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 12, color: '#666' }}>
        (Campañas y CRUD de Historias pueden añadirse si hay tiempo extra; para el examen, puedes documentarlas.)
      </p>
    </div>
  );
}
