import { Link } from 'react-router-dom';
import type { Asset } from '../../hooks/useAssets';
export const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => {
    // Dynamische Badge-Farbe je nach Status
 const badge =
   asset.status === 'in Betrieb'
     ? 'bg-green-100 text-green-700' // Grün für aktiv
     : 'bg-red-100 text-red-700'; // Rot für nicht aktiv
 return (
<Link
     to={`/asset/${asset.id}`}
     className="block rounded-xl bg-white p-4 shadow transition hover:shadow-2xl"
>
<h3 className="mb-2 text-lg font-semibold">{asset.name}</h3>
<p className="text-sm text-gray-500">{asset.type}</p>
<span className={`mt-4 inline-block rounded px-2 py-0.5 text-xs ${badge}`}>
       {asset.status}
</span>
</Link>
 );
};