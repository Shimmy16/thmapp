// pages/DashboardPage.tsx
import { useState } from 'react';
import { useAssets,type Asset } from '../hooks/useAssets';
import { AssetCard } from '../components/cards/AssetCard';
import Container from '../components/layout/Container';
export default function DashboardPage() {
 const { assets, loading } = useAssets();
 const [statusFilter, setFilter] = useState<string>('alle');
 /* ---------- Filter anwenden ---------- */
 const filtered = assets.filter((a: Asset) =>
   statusFilter === 'alle' ? true : a.status === statusFilter
 );
 return (
<Container>
<h2 className="text-xl font-bold mb-4">Übersicht</h2>
     {/* ---------- Filter-Dropdown ---------- */}
<div className="mb-4">
<label className="mr-2 text-sm font-semibold">Status:</label>
<select
         value={statusFilter}
         onChange={e => setFilter(e.target.value)}
         className="rounded border px-2 py-1 text-sm"
>
<option value="alle">alle</option>
<option value="in Betrieb">in Betrieb</option>
<option value="in Wartung">in Wartung</option>
<option value="ausser Betrieb">ausser Betrieb</option>
</select>
</div>
     {/* ---------- Anzeige ---------- */}
     {loading ? (
<p>Lade Assets …</p>
     ) : filtered.length === 0 ? (
<p>Keine Assets für diesen Filter.</p>
     ) : (
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
         {filtered.map(a => (
<AssetCard key={a.id} asset={a} />
         ))}
</div>
     )}
</Container>
 );
}