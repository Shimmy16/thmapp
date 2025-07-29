import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { useAssets } from '../hooks/useAssets';
import { utils, writeFile } from 'xlsx';

interface Asset {
  id: string;
  name: string;
  type: string;
  status: string;
  location?: string;
}

interface LiveData {
  temperature: number | null;
  btcUsd: number | null;
  timestamp: string;
}

export default function AssetListPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [liveData, setLiveData] = useState<Record<string, LiveData | null>>({});
  const [loading, setLoading] = useState(true);
  const { deleteAsset } = useAssets();

  // Assets + Live-Daten laden
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const { data } = await ApiService.get<Asset[]>('/assets');
        setAssets(data);

        data.forEach(asset => {
          ApiService.get<LiveData>(`/assets/${asset.id}/live`)
            .then(res =>
              setLiveData(prev => ({ ...prev, [asset.id]: res.data }))
            )
            .catch(() =>
              setLiveData(prev => ({ ...prev, [asset.id]: null }))
            );
        });
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
    const interval = setInterval(loadAssets, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Löschen-Funktion
  const handleDelete = async (id: string) => {
    if (confirm('Asset wirklich löschen?')) {
      await deleteAsset(id);
      setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  // 📄 Excel-Export
  const handleExport = () => {
    const exportData = assets.map(a => {
      const live = liveData[a.id];
      return {
        Name: a.name,
        Typ: a.type,
        Status: a.status,
        Standort: a.location || '-',
        Temperatur: live?.temperature ?? '-',
        'BTC-Preis ($)': live?.btcUsd?.toFixed(0) ?? '-',
        'Letztes Update': live?.timestamp
          ? new Date(live.timestamp).toLocaleString()
          : '-',
      };
    });

    const worksheet = utils.json_to_sheet(exportData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Assets');

    writeFile(workbook, 'assets.xlsx');
  };

  if (loading) return <p className="p-6">Lade …</p>;

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-mertens-brand">Alle Assets</h2>
        <button
          onClick={handleExport}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          📄 Als Excel exportieren
        </button>
      </div>

      {/* Desktop-Ansicht */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Typ</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Standort</th>
              <th className="px-4 py-2 text-left">Live-Status</th>
              <th className="px-4 py-2 text-left">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => {
              const live = liveData[asset.id];
              return (
                <tr key={asset.id} className="border-b">
                  <td className="px-4 py-2">{asset.name}</td>
                  <td className="px-4 py-2">{asset.type}</td>
                  <td className="px-4 py-2">{asset.status}</td>
                  <td className="px-4 py-2">{asset.location || '-'}</td>
                  <td className="px-4 py-2">
                    {live
                      ? `Temp: ${live.temperature ?? '-'}°C | Preis: ${live.btcUsd?.toFixed(0) ?? '-'}$`
                      : 'Keine Daten'}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Ansicht */}
      <div className="mt-4 grid gap-4 md:hidden">
        {assets.map(asset => {
          const live = liveData[asset.id];
          return (
            <div
              key={asset.id}
              className="rounded-lg border p-4 shadow-sm bg-white"
            >
              <p className="text-lg font-bold">{asset.name}</p>
              <p className="text-sm text-gray-600">{asset.type}</p>
              <p>Status: {asset.status}</p>
              <p>Standort: {asset.location || '-'}</p>
              <p className="text-sm text-gray-700 mt-1">
                Live:{" "}
                {live
                  ? `Temp: ${live.temperature ?? '-'}°C | Preis: ${live.btcUsd?.toFixed(0) ?? '-'}$`
                  : 'Keine Daten'}
              </p>
              <button
                onClick={() => handleDelete(asset.id)}
                className="mt-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                Löschen
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
