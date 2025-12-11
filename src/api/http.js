
// src/api/http.js
export const API_URL = import.meta.env.VITE_API_URL;

function getAuthToken() {
  try {
    const saved = localStorage.getItem('katze_auth');
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

/**
 * apiFetch: Helper para llamar al backend con fetch + JWT.
 */
export async function apiFetch(endpoint, { method = 'GET', body = null, headers = {}, autoJSON = true } = {}) {
  const token = getAuthToken();
  const isJSON = body && typeof body === 'object';
  const h = {
    ...(isJSON ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: h,
    body: isJSON ? JSON.stringify(body) : body
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      errMsg = data?.error || errMsg;
    } catch {}
    throw new Error(errMsg);
  }
  return autoJSON ? res.json() : res;
}

export const apiGet = (endpoint) => apiFetch(endpoint, { method: 'GET' });
export const apiPost = (endpoint, body) => apiFetch(endpoint, { method: 'POST', body });
export const apiPatch = (endpoint, body) => apiFetch(endpoint, { method: 'PATCH', body });
export const apiDelete = (endpoint) => apiFetch(endpoint, { method: 'DELETE' });
