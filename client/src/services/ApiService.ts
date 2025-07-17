import axios from 'axios';

const ApiService = axios.create({
  // Base-URL wird aus .env gelesen (VITE_API_URL)
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor: Hänge User-ID als Header an
ApiService.interceptors.request.use(cfg => {
  const user = localStorage.getItem('user');
  if (user) {
    const parsed = JSON.parse(user);
    cfg.headers['X-User-ID'] = parsed.id;
  }
  return cfg;
});

export default ApiService;
