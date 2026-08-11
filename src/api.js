const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const TOKEN_KEY = 'linguawork_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = 'Bearer ' + token;

  const res = await fetch(API_URL + path, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'Błąd żądania');
    err.status = res.status;
    err.details = data.details;
    throw err;
  }
  return data;
}

// === AUTH ===
export const authApi = {
  register: (data) => request('/auth/register', { method: 'POST', body: data }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  me: () => request('/auth/me')
};

// === AI / SESSIONS ===
export const aiApi = {
  scenarios: () => request('/ai/scenarios'),
  chat: (scenarioKey, history, message) =>
    request('/ai/chat', { method: 'POST', body: { scenarioKey, history, message } }),
  evaluate: (scenarioKey, history) =>
    request('/ai/evaluate', { method: 'POST', body: { scenarioKey, history } }),
  sessions: () => request('/ai/sessions')
};

// === LESSONS / PROGRESS / STATS ===
export const lessonsApi = {
  list: () => request('/lessons'),
  complete: (id) => request(`/lessons/${id}/complete`, { method: 'POST' }),
  flashcardSeen: () => request('/lessons/flashcard-seen', { method: 'POST' }),
  quizResult: (score, total) => request('/lessons/quiz-result', { method: 'POST', body: { score, total } }),
  stats: () => request('/lessons/stats')
};

// === TRAINER ===
export const trainerApi = {
  employees: () => request('/trainer/employees'),
  teamStats: () => request('/trainer/team-stats'),
  createAssignment: (data) => request('/trainer/assignments', { method: 'POST', body: data }),
  assignments: () => request('/trainer/assignments')
};
