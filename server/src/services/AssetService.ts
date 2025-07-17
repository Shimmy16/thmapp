// services/AssetService.ts
import { Request, Response } from 'express';
import AssetRepository  from '../repositories/AssetRepository';
import IoTService       from './IoTService';
import SupplierService  from './SupplierService';
/* Hilfs-Funktion: bereits defensiv, falls lean() verwendet wird */
function toDTO(doc: any) {
 const obj =
   typeof doc?.toObject === 'function'
     ? doc.toObject({ versionKey: false })
     : { ...doc };
obj.id = obj._id;
 delete obj._id;
 return obj;
}
/* ───────── CRUD ───────── */
async function getAllAssets(_req: Request, res: Response): Promise<void> {
 const docs = await AssetRepository.findAll();
 res.json(docs);
}
async function createAsset(req: Request, res: Response): Promise<void> {
 const doc = await AssetRepository.create(req.body);
 res.status(201).json({ id: doc.id });
}
async function getAssetById(req: Request, res: Response): Promise<void> {
 const doc = await AssetRepository.findById(req.params.id);
 if (!doc) { res.status(404).end(); return; }
 res.json(doc);
}
async function updateAsset(req: Request, res: Response): Promise<void> {
 await AssetRepository.update(req.params.id, req.body);
 res.json({ message: 'Asset aktualisiert' });
}
async function deleteAsset(req: Request, res: Response): Promise<void> {
 await AssetRepository.delete(req.params.id);
 res.status(204).end();
}
/* ───────── Live-Daten ───────── */
async function getAssetLiveData(req: Request, res: Response): Promise<void> {
 const asset = await AssetRepository.findById(req.params.id);
 if (!asset) { res.status(404).end(); return; }
 try {
   const [live, supplier] = await Promise.all([
     IoTService.getLiveData(asset.id),         // Temperatur, Vibration
     SupplierService.getSupplierInfo(asset.id) // BTC-Preis
   ]);
   res.json({
     temperature: live.temperature,
     vibration:   live.vibration,
     btcUsd:      supplier.btcUsd,
     timestamp:   new Date().toISOString()
   });
 } catch (err) {
   console.error('Live-Fetch fehlgeschlagen:', err);
   res.status(500).json({ error: 'Live-Daten nicht verfügbar' });
 }
}
/* ───────── Export ───────── */
export default {
 getAllAssets,
 createAsset,
 getAssetById,
 updateAsset,
 deleteAsset,
 getAssetLiveData,
};