
import React from 'react';

export default function Stories() {
  // Para demo: estáticas; si tienes cases 'adopted', puedes listarlos con getCats({ status:'adopted' })
  return (
    <div>
      <h2>Historias de Éxito</h2>
      <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))' }}>
        <div style={{ border:'1px solid #ddd', borderRadius:8, padding:12 }}>
          https://placekitten.com/400/250
          <h3>Luna</h3>
          <p>Encontró un hogar amoroso. 🐾</p>
        </div>
        <div style={{ border:'1px solid #ddd', borderRadius:8, padding:12 }}>
          https://placekitten.com/401/250
          <h3>Milo</h3>
          <p>Feliz y juguetón en su nueva casa.</p>
        </div>
      </div>
    </div>
  );
}
