// pages/AddAssetPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../hooks/useAssets';
import Container from '../components/layout/Container';

export default function AddAssetPage() {
  const { createAsset } = useAssets();
  const navigate = useNavigate();
  // Form-State
  const [form, setForm] = useState({
    name: '',
    type: '',
    location: '',
    status: 'in Betrieb',
  });
  // UI-States
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    try {
      await createAsset(form); // createAsset erwartet Omit<Asset,'id'> → passt zu unserem form
      setMessage('Asset erfolgreich erstellt.');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Fehler beim Erstellen des Assets.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4 text-2xl font-bold text-mertens-brand">Neues Asset anlegen</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md bg-white p-6 rounded-xl shadow-md"
      >
        {error && (
          <p className="rounded bg-red-100 px-2 py-1 text-sm text-red-700">{error}</p>
        )}
        {message && (
          <p className="rounded bg-green-100 px-2 py-1 text-sm text-green-700">{message}</p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full rounded border p-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Typ</label>
          <input
            type="text"
            className="w-full rounded border p-2"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Standort</label>
          <input
            type="text"
            className="w-full rounded border p-2"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full rounded border p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>in Betrieb</option>
            <option>in Wartung</option>
            <option>ausser Betrieb</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-mertens-accent py-2 font-semibold text-white hover:bg-mertens-brand"
        >
          Speichern
        </button>
      </form>
    </Container>
  );
}
