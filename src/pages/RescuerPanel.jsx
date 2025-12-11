
import React, { useState, useEffect, useContext } from 'react';
import { getCats, sendCreateCat, sendUpdateCat, sendPublishCat, sendAutoTag } from '../api/katze.js';
import { AuthContext } from '../context/AuthContext.jsx';

export default function RescuerPanel() {
  const { user } = useContext(AuthContext);
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({ name:'', sex:'F', ageMonths:6, description:'', photos:[] });
  const [suggestedTags, setSuggestedTags] = useState([]);

  useEffect(() => { loadCats(); }, []);
  const loadCats = async () => { setCats(await getCats()); };

  const onDescChange = async (e) => {
    const description = e.target.value;
    setForm(f => ({ ...f, description }));
    try {
      const res = await sendAutoTag(description);
      setSuggestedTags(res.tags || []);
    } catch {}
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await sendCreateCat(form);
      alert('Caso creado');
      setForm({ name:'', sex:'F', ageMonths:6, description:'', photos:[] });
      setSuggestedTags([]);
      loadCats();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const setAdoption = async (id) => {
    try {
      await sendUpdateCat(id, { status: 'adoption' });
      alert('Estado: adoption');
      loadCats();
    } catch (e) { alert(`Error: ${e.message}`); }
  };

  const publish = async (id) => {
    try {
      await sendPublishCat(id);
      alert('Publicado (simulado n8n)');
    } catch (e) { alert(`Error: ${e.message}`); }
  };

  return (
    <div>
      <h2>Panel Rescatista</h2>
      <form onSubmit={create} style={{ maxWidth: 520 }}>
        <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{ width:'100%', margin:'6px 0' }}/>
        <select value={form.sex} onChange={e=>setForm({...form, sex:e.target.value})} style={{ width:'100%', margin:'6px 0' }}>
          <option value="M">Macho</option><option value="F">Hembra</option>
        </select>
        <input placeholder="Edad (meses)" type="number" value={form.ageMonths} onChange={e=>setForm({...form, ageMonths:+e.target.value})} style={{ width:'100%', margin:'6px 0' }}/>
        <textarea placeholder="Descripción" value={form.description} onChange={onDescChange} style={{ width:'100%', margin:'6px 0' }}/>
        {suggestedTags.length > 0 && (
          <p style={{ fontSize: 12 }}>Tags sugeridos: {suggestedTags.join(', ')}</p>
        )}
        <button>Crear caso</button>
      </form>

      <h3>Casos</h3>
      {cats.map(c => (
        <div key={c._id} style={{ border:'1px solid #ddd', padding:8, margin:'6px 0' }}>
          <strong>{c.name}</strong> — estado: {c.status} — tags: {(c.tags||[]).join(', ')}
          <div style={{ marginTop:6 }}>
            <button onClick={() => setAdoption(c._id)}>Marcar “adoption”</button>
            <button onClick={() => publish(c._id)} style={{ marginLeft:6 }}>Publicar (n8n)</button>
          </div>
        </div>
      ))}
    </div>
  );
}
