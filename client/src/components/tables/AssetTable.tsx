// components/tables/AssetTable.tsx
import { type Asset } from '../../hooks/useAssets';
import { Link } from 'react-router-dom';
import { useAssets } from '../../hooks/useAssets';
interface Props { assets: Asset[] }
export const AssetTable: React.FC<Props> = ({ assets }) => {
 const { deleteAsset } = useAssets();
 // Lösch-Handler mit confirm-Dialog
 const handleDelete = (id: string) => {
   if (confirm('Asset wirklich löschen?')) deleteAsset(id);
 };
 return (
<div className="overflow-x-auto rounded-lg shadow">
<table className="min-w-full text-sm">
<thead className="bg-gray-100">
<tr>
<th className="p-2 text-left">Name</th>
<th className="p-2 text-left">Typ</th>
<th className="p-2 text-left">Status</th>
<th className="p-2 text-left">Aktion</th>
</tr>
</thead>
<tbody>
         {assets.map((a) => (
<tr key={a.id} className="border-t">
<td className="p-2">{a.name}</td>
<td className="p-2">{a.type}</td>
<td className="p-2">{a.status}</td>
<td className="p-2 flex gap-3">
<Link to={`/asset/${a.id}`} className="text-blue-600 hover:underline">
                 Details
</Link>
               {/* 🗑 Delete */}
<button
                 title="Löschen"
                 onClick={() => handleDelete(a.id)}
                 className="text-red-600 hover:underline"
>
                 🗑
</button>
</td>
</tr>
         ))}
</tbody>
</table>
</div>
 );
};