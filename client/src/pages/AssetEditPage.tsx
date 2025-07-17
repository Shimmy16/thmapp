import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import Container from '../components/layout/Container';
import type { Asset } from '../hooks/useAssets';

export default function AssetEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [asset, set] = useState<Omit<Asset, 'id'> | null>(null);

  useEffect(() => {
    ApiService.get<Asset>(`/assets/${id}`).then(r => {
      const { id: _, ...rest } = r.data;
      set(rest);
    });
  }, [id]);

  if (!asset) return <p className="p-6">Lade …</p>;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await ApiService.put(`/assets/${id}`, asset);
    nav(-1);
  };

  const statusOptions = ['in Betrieb', 'in Wartung', 'außer Betrieb'];

  return (
    <Container>
      <h2 className="mb-4 text-xl font-bold">Asset bearbeiten</h2>
      <form onSubmit={save} className="space-y-4 max-w-md">
        {/* Name, Type, Location als Input */}
        {(['name', 'type', 'location'] as const).map(f => (
          <input
            key={f}
            value={asset[f] ?? ''}
            onChange={e => set({ ...asset, [f]: e.target.value })}
            placeholder={f}
            className="w-full rounded border p-2"
          />
        ))}

        {/* Status als Dropdown */}
        <select
          value={asset.status}
          onChange={e => set({ ...asset, status: e.target.value })}
          className="w-full rounded border p-2"
        >
          <option value="">Status wählen …</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button className="rounded bg-mertens-brand px-4 py-2 text-white hover:bg-mertens-accent">
          Speichern
        </button>
      </form>
    </Container>
  );
}
