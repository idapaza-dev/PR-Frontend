
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { getCats, sendCreateAdoption } from '../api/katze.js';

export default function Home() {
  const [cats, setCats] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCats().then(setCats);
  }, []);

  const requestAdoption = async (catId) => {
    try {
      await sendCreateAdoption({ catId, answers: { motivo: 'Quiero adoptar' } });
      alert('Solicitud enviada');
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  return (

<div className="max-w-6xl mx-auto p-6">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">Gatos en adopción</h2>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {cats.filter(c => c.status === 'adoption').map(cat => (
      <div
        key={cat._id}
        className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-200"
      >
        <img
          src={cat.photos?.[0]?.url || 'https://placekitten.com/320/200'}
          alt={cat.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
        <p className="text-gray-600 text-sm mt-2">{cat.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {(cat.tags || []).map(t => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        {user?.roles?.includes('adoptante') && (
          <button
            onClick={() => requestAdoption(cat._id)}
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Solicitar adopción
          </button>
        )}
      </div>
    ))}
  </div>
</div>
  );
}
