import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import Container from '../components/layout/Container';

interface User {
  id: string;
  email: string;
}

export default function UserManagementPage() {
  // State für User und Formularfelder
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  // Benutzerdaten beim Laden holen
  useEffect(() => {
    ApiService.get('/me').then(res => {
      setUser(res.data);  // User im State speichern
      setEmail(res.data.email); // E-Mail ins Formular übernehmen
    });
  }, []);
  // Speichern-Handler
  const handleSave = async () => {
    setError(null);
    setMessage('');
    // Wenn Passwort geändert werden soll → aktuelles Passwort muss angegeben werden
    if (password && !currentPassword) {
      setError('Bitte geben Sie Ihr aktuelles Passwort ein.');
      return;
    }
    // Wenn neues Passwort ≠ Bestätigung → Fehler
    if (password && password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    try {
      // API-Call zum Aktualisieren des Users
      await ApiService.put('/me', {
        email,
        currentPassword: currentPassword || undefined,
        password: password || undefined,
      });
      // Erfolgsmeldung setzen und Passwortfelder leeren
      setMessage('Profil erfolgreich aktualisiert.');
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      setError('Fehler beim Aktualisieren.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4 text-2xl font-bold text-mertens-brand">Benutzerprofil</h2>

      {user ? (
        <form
          onSubmit={e => {
            e.preventDefault(); // Standard-Submit verhindern
            handleSave();       // Speichern aufrufen
          }}
          className="space-y-4 max-w-md bg-white p-6 rounded-xl shadow-md"
        >
          {error && (
            <p className="rounded bg-red-100 px-2 py-1 text-sm text-red-700">{error}</p>
          )}
          {message && (
            <p className="rounded bg-green-100 px-2 py-1 text-sm text-green-700">{message}</p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">E-Mail</label>
            <input
              type="email"
              className="w-full rounded border p-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Aktuelles Passwort</label>
            <input
              type="password"
              className="w-full rounded border p-2"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="Erforderlich bei Passwortänderung"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Neues Passwort</label>
            <input
              type="password"
              className="w-full rounded border p-2"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Passwort bestätigen</label>
            <input
              type="password"
              className="w-full rounded border p-2"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-mertens-accent py-2 font-semibold text-white hover:bg-mertens-brand"
          >
            Speichern
          </button>
        </form>
      ) : (
        <p>Lade Benutzerdaten …</p>
      )}
    </Container>
  );
}
