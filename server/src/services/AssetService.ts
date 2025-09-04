// services/AssetService.ts
import { Request, Response } from 'express';
import AssetRepository  from '../repositories/AssetRepository';
import IoTService       from './IoTService';
import SupplierService  from './SupplierService';
/* Hilfs-Funktion: bereits defensiv, falls lean() verwendet wird */
function toDTO(doc: any) {
    // Falls doc ein echtes Mongoose-Dokument ist → .toObject()
    // Falls .lean() genutzt wurde → doc ist bereits ein Plain Object
 const obj =
   typeof doc?.toObject === 'function'
     ? doc.toObject({ versionKey: false }) // _v wird entfernt
     : { ...doc };
obj.id = obj._id; // id lesbarer machen
 delete obj._id; // Original _id entfernen
 return obj;
}
/* ───────── CRUD ───────── */

// Holt alle Assets
async function getAllAssets(_req: Request, res: Response): Promise<void> {
 const docs = await AssetRepository.findAll();
 res.json(docs); // gibt DTOs zurück
}

// Legt ein neues Asset an
async function createAsset(req: Request, res: Response): Promise<void> {
 const doc = await AssetRepository.create(req.body);
 res.status(201).json({ id: doc.id }); // gibt nur die neue ID zurück
}
// Holt ein einzelnes Asset nach ID
async function getAssetById(req: Request, res: Response): Promise<void> {
 const doc = await AssetRepository.findById(req.params.id);
 if (!doc) { res.status(404).end(); return; } // falls Asset nicht existiert
 res.json(doc);
}
// Aktualisiert ein Asset nach ID
async function updateAsset(req: Request, res: Response): Promise<void> {
 await AssetRepository.update(req.params.id, req.body);
 res.json({ message: 'Asset aktualisiert' });
}
// Löscht ein Asset nach ID
async function deleteAsset(req: Request, res: Response): Promise<void> {
 await AssetRepository.delete(req.params.id);
 res.status(204).end();
}
/* ───────── Live-Daten ───────── */

// Kombiniert lokale Asset-Daten mit externen Live-Daten
async function getAssetLiveData(req: Request, res: Response): Promise<void> {
 const asset = await AssetRepository.findById(req.params.id);
 if (!asset) { res.status(404).end(); return; }
 try {
      // Parallel: IoT-Daten + Supplier-Daten holen
   const [live, supplier] = await Promise.all([
     IoTService.getLiveData(asset.id),         // Temperatur, Vibration
     SupplierService.getSupplierInfo(asset.id) // BTC-Preis
   ]);
   res.json({
     temperature: live.temperature,
     vibration:   live.vibration,
     btcUsd:      supplier.btcUsd,
     timestamp:   new Date().toISOString() // aktueller Zeitpunkt
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