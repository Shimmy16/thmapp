// routes/AssetRouter.ts
import express from 'express';
import AssetService from '../services/AssetService';
const router = express.Router();
/* ───────── Sammlung ───────── */
router.get('/',  AssetService.getAllAssets);
router.post('/', AssetService.createAsset);
/* ───────── Live-Daten (NEU) ─────────
  Beispiel-Aufruf:
  GET /assets/684a94d429126e744c1581df/live
*/
router.get('/:id/live', AssetService.getAssetLiveData);
/* ───────── Einzelnes Asset ───────── */
router.get('/:id',    AssetService.getAssetById);
router.put('/:id',    AssetService.updateAsset);
router.delete('/:id', AssetService.deleteAsset);
export default router;