import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';   // ← Link ergänzt
import ApiService from '../services/ApiService';
import type { Asset } from '../hooks/useAssets';
import { useAssets } from '../hooks/useAssets';
interface LiveData {
 temperature: number | null;
 vibration:   number | null;
 btcUsd:      number | null;
 timestamp:   string;
}
export default function AssetDetailPage() {
 const { id }              = useParams();
 const navigate            = useNavigate();
 const { deleteAsset }     = useAssets();
 const [asset, setAsset]   = useState<Asset | null>(null);
 const [live,  setLive]    = useState<LiveData | null>(null);
 const [loading, setLoad]  = useState(true);
 /* ---------- Stammdaten laden ---------- */
 useEffect(() => {
   (async () => {
     try {
       const { data } = await ApiService.get<Asset>(`/assets/${id}`);
       setAsset(data);
     } finally {
       setLoad(false);
     }
   })();
 }, [id]);
 /* ---------- Live-Daten laden & pollen ---------- */
 useEffect(() => {
   if (!id) return;
   const load = () =>
     ApiService.get<LiveData>(`/assets/${id}/live`).then(r => setLive(r.data));
   load();
   const t = setInterval(load, 60_000); // jede Minute
   return () => clearInterval(t);
 }, [id]);
 /* ---------- Löschen ---------- */
 const handleDelete = async () => {
   if (confirm('Asset wirklich löschen?')) {
     await deleteAsset(asset!.id);
     navigate('/dashboard');
   }
 };
 /* ---------- UI ---------- */
 if (loading)          return <p className="p-6">Lade …</p>;
 if (!asset)           return <p className="p-6">Asset nicht gefunden</p>;
 const badgeColor =
   asset.status === 'in Betrieb'
     ? 'bg-green-100 text-green-700'
     : 'bg-red-100 text-red-700';
 return (
<div className="mx-auto max-w-xl p-6">
<button
       onClick={() => navigate(-1)}
       className="mb-4 text-sm text-mertens-brand hover:underline"
>
       ← zurück
</button>
     {/* Grundinfos ------------------------------------------------ */}
<h2 className="mb-2 text-2xl font-bold">{asset.name}</h2>
<p className="text-gray-600 mb-1">
<span className="font-semibold">Typ:</span> {asset.type}
</p>
<p className="mb-1">
<span className="font-semibold">Status:</span>{' '}
<span className={`inline-block rounded px-2 py-0.5 text-xs ${badgeColor}`}>
         {asset.status}
</span>
</p>
     {asset.location && (
<p className="mb-1">
<span className="font-semibold">Standort:</span> {asset.location}
</p>
     )}
     {/* Live-Daten ------------------------------------------------ */}
<h3 className="mt-6 mb-2 font-semibold">Live-Status</h3>
     {live ? (
<div className="grid gap-2 text-sm">
<p>Temperatur: {live.temperature ?? '–'} °C</p>
<p>Vibration:   {live.vibration   ?? '–'} mm/s</p>
<p>Preis:     {live.btcUsd ? live.btcUsd.toFixed(0) + ' $' : '–'}</p>
<p className="text-gray-500 text-xs">
           Stand&nbsp;{new Date(live.timestamp).toLocaleTimeString()}
</p>
</div>
     ) : (
<p className="text-sm text-gray-500">Live-Daten werden geladen …</p>
     )}
     {/* Aktionen -------------------------------------------------- */}
<div className="mt-6 flex gap-4">
       {/* Bearbeiten-Link */}
<Link
         to={`/asset/${asset.id}/edit`}
         className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
         Asset bearbeiten
</Link>
       {/* Löschen-Button */}
<button
         onClick={handleDelete}
         className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
>
         Asset löschen
</button>
</div>
</div>
 );
}