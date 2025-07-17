// hooks/useAssets.ts
import { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/ApiService';
export interface Asset {
 id: string;
 name: string;
 type: string;
 status: string;
 location?: string;
}
export function useAssets() {
 const [assets,  setAssets]  = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
 const [error,   setError]   = useState<string | null>(null);
 /* ---------- Helper ---------- */
 const fetchAssets = useCallback(async () => {
   try {
    setLoading(true);
    const { data } = await ApiService.get<Asset[]>('/assets');
    setAssets(data);
   } catch (err) {
     setError('Konnte Assets nicht laden');
   } finally {
    setLoading(false);
   }
 }, []);
 /* ---------- CRUD ---------- */
 const createAsset = useCallback(
   async (asset: Omit<Asset, 'id'>) => {
    await ApiService.post('/assets', asset);
    fetchAssets();
   },
   [fetchAssets]
 );
 const updateAsset = useCallback(
   async (id: string, updates: Partial<Asset>) => {
    await ApiService.put(`/assets/${id}`, updates);
    fetchAssets();
   },
   [fetchAssets]
 );
 const deleteAsset = useCallback(
   async (id: string) => {
    await ApiService.delete(`/assets/${id}`);
     setAssets(prev => prev.filter(a => a.id !== id));
   },
   []
 );
 /* ---------- Einzelnes Asset ---------- */
 const getAssetById = useCallback(
   (id: string) => assets.find(a => a.id === id),
   [assets]
 );
 /* ---------- Initial Load ---------- */
 useEffect(() => {
   fetchAssets();
 }, [fetchAssets]);
 /* ---------- Return ---------- */
 return {
   assets,
   loading,
   error,
   createAsset,
   updateAsset,
   deleteAsset,
   getAssetById,
   refetch: fetchAssets,
 };
}