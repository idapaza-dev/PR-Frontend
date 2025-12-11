
import React, { useState, useEffect } from 'react';
import { getMyAdoptions, getRecommendations } from '../api/katze.js';

export default function AdopterPanel() {
  const [requests, setRequests] = useState([]);
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    getMyAdoptions().then(setRequests);
    getRecommendations().then(setRecs);
  }, []);

  return (
    <div>
      <h2>Panel Adoptante</h2>
      <h3>Mis solicitudes</h3>
      <ul>{requests.map(r => <li key={r._id}>{r.catId} — estado: {r.status}</li>)}</ul>

      <h3>Recomendaciones</h3>
      <ul>
        {recs.map(x => <li key={x.catId}><strong>{x.name}</strong> (score {x.score}) — {x.reasons.join('; ')}</li>)}
      </ul>
    </div>
  );
}
