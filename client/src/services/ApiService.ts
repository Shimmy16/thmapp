import axios from 'axios';
// Axios-Instanz erstellen
const ApiService = axios.create({
  // Base-URL wird aus .env gelesen (VITE_API_URL)
  baseURL: import.meta.env.VITE_API_URL,
  // Standard-Header für alle Requests
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor: Hänge User-ID als Header an
ApiService.interceptors.request.use(cfg => {
  // User-Infos aus LocalStorage holen
  const user = localStorage.getItem('user');
  if (user) {
    // User-Objekt parsen
    const parsed = JSON.parse(user);
    // User-ID als Header anhängen (z. B. für Auth)
    cfg.headers['X-User-ID'] = parsed.id;
  }
  // Config zurückgeben, damit Request weiterläuft
  return cfg;
});

export default ApiService;
