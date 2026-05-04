import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const TOKEN_KEY = 'epsilon_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const api = {
  login: (email, password) =>
    axios.post(`${API}/auth/login`, { email, password }).then((r) => r.data),
  me: () => axios.get(`${API}/auth/me`, { headers: authHeader() }).then((r) => r.data),
  changePassword: (current, newPassword) =>
    axios.post(`${API}/auth/change-password`, { current, new: newPassword }, { headers: authHeader() }).then((r) => r.data),

  stats: () => axios.get(`${API}/admin/stats`, { headers: authHeader() }).then((r) => r.data),

  // home content
  getHome: () => axios.get(`${API}/content/home`).then((r) => r.data),
  putHome: (data) => axios.put(`${API}/content/home`, data, { headers: authHeader() }).then((r) => r.data),

  getBeliefs: () => axios.get(`${API}/content/beliefs`).then((r) => r.data),
  putBeliefs: (items) => axios.put(`${API}/content/beliefs`, items, { headers: authHeader() }).then((r) => r.data),

  // generic CRUD
  list: (path) => axios.get(`${API}/${path}`).then((r) => r.data),
  get: (path, id) => axios.get(`${API}/${path}/${id}`).then((r) => r.data),
  create: (path, body) => axios.post(`${API}/${path}`, body, { headers: authHeader() }).then((r) => r.data),
  update: (path, id, body) => axios.put(`${API}/${path}/${id}`, body, { headers: authHeader() }).then((r) => r.data),
  remove: (path, id) => axios.delete(`${API}/${path}/${id}`, { headers: authHeader() }).then((r) => r.data),

  // submissions
  submitApply: (body) => axios.post(`${API}/submissions/apply`, body).then((r) => r.data),
  submitContact: (body) => axios.post(`${API}/submissions/contact`, body).then((r) => r.data),
  submitBrochure: (body) => axios.post(`${API}/submissions/brochure`, body).then((r) => r.data),
  submitSubscribe: (body) => axios.post(`${API}/submissions/subscribe`, body).then((r) => r.data),
  submitSchedule: (body) => axios.post(`${API}/submissions/schedule`, body).then((r) => r.data),
  submitCorporate: (body) => axios.post(`${API}/submissions/corporate`, body).then((r) => r.data),
  listSubmissions: (kind) => axios.get(`${API}/submissions/${kind}`, { headers: authHeader() }).then((r) => r.data),
  removeSubmission: (kind, id) => axios.delete(`${API}/submissions/${kind}/${id}`, { headers: authHeader() }).then((r) => r.data),
};
