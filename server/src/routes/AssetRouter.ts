import express from 'express';
import AssetService from '../services/AssetService';
const router = express.Router();

router.get('/',  AssetService.getAllAssets); // Holt alle Assets (GET /assets)
router.post('/', AssetService.createAsset); // Erstellt ein neues Asset (POST /assets)

router.get('/:id/live', AssetService.getAssetLiveData);

router.get('/:id',    AssetService.getAssetById); // Holt ein bestimmtes Asset anhand der ID (GET /assets/:id)
router.put('/:id',    AssetService.updateAsset); // Aktualisiert ein Asset anhand der ID (PUT /assets/:id)
router.delete('/:id', AssetService.deleteAsset); // Löscht ein Asset anhand der ID (DELETE /assets/:id)
export default router;