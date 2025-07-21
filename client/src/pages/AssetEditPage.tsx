// pages/AssetEditPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import Container from '../components/layout/Container';
import type { Asset } from '../hooks/useAssets';

export default function AssetEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [asset, set] = useState<Omit<Asset, 'id'> | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ApiService.get<Asset>(`/assets/${id}`).then(r => {
      const { id: _, ...rest } = r.data;
      set(rest);
    });
  }, [id]);

  if (!asset) return <p className="p-6">Lade …</p>;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    try {
      await ApiService.put(`/assets/${id}`, asset);
      setMessage('Asset erfolgreich aktualisiert.');
      nav(-1);
    } catch (err) {
      console.error(err);
      setError('Fehler beim Speichern.');
    }
  };

  const statusOptions = ['in Betrieb', 'in Wartung', 'ausser Betrieb'];

  return (
    <Container>
      <h2 className="mb-4 text-2xl font-bold text-mertens-brand">Asset bearbeiten</h2>

      <form
        onSubmit={save}
        className="space-y-4 max-w-md bg-white p-6 rounded-xl shadow-md"
      >
        {error && (
          <p className="rounded bg-red-100 px-2 py-1 text-sm text-red-700">{error}</p>
        )}
        {message && (
          <p className="rounded bg-green-100 px-2 py-1 text-sm text-green-700">{message}</p>
        )}

        {(['name', 'type', 'location'] as const).map(f => (
          <div key={f}>
            <label className="block text-sm font-medium mb-1">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
            <input
              value={asset[f] ?? ''}
              onChange={e => set({ ...asset, [f]: e.target.value })}
              placeholder={f}
              className="w-full rounded border p-2"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={asset.status}
            onChange={e => set({ ...asset, status: e.target.value })}
            className="w-full rounded border p-2"
            required
          >
            <option value="">Status wählen …</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
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
