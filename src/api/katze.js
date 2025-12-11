
// src/api/katze.js
import { apiGet, apiPost, apiPatch } from './http';

// Auth
export async function loginApi(email, password) {
  return apiPost('/auth/login', { email, password });
}
export async function registerApi(payload) {
  return apiPost('/auth/register', payload); // {name,email,password,role}
}

// Cats
export async function getCats(query = {}) {
  const qs = new URLSearchParams(query).toString();
  return apiGet(`/cats${qs ? `?${qs}` : ''}`);
}
export async function sendCreateCat(payload) {
  return apiPost('/cats', payload); // requiere rescatista/admin
}
export async function sendUpdateCat(catId, updates) {
  return apiPatch(`/cats/${catId}`, updates); // dueño o admin
}
export async function sendPublishCat(catId) {
  return apiPost(`/cats/${catId}/publish`, {}); // simulación n8n
}

// Adoptions
export async function sendCreateAdoption({ catId, answers }) {
  return apiPost('/adoptions', { catId, answers }); // adoptante
}
export async function getMyAdoptions() {
  return apiGet('/adoptions/mine'); // adoptante
}

// ML
export async function sendAutoTag(text) {
  return apiPost('/ml/autotag', { text });
}
export async function getRecommendations() {
  return apiGet('/ml/recommendations'); // adoptante
}

// Admin
export async function adminListUsers() {
  return apiGet('/admin/users'); // admin
}
export async function adminApproveRescuer(userId) {
  return apiPost('/admin/approve-rescuer', { userId }); // admin
}
