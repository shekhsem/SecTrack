import express from 'express';
import { handleCreateAsset } from '../controllers/asset/createAsset.js';
import { handleDisplayAsset } from '../controllers/asset/displayAsset.js';
import { handleDeleteAsset } from '../controllers/asset/deleteAsset.js';
import { handleEditAsset } from '../controllers/asset/editAsset.js';

const router = express.Router();

router.post('/create', handleCreateAsset); //create asset
router.get('/display', handleDisplayAsset); //display asset list
router.delete('/delete', handleDeleteAsset); //delete asset
router.put('/edit', handleEditAsset); //edit asset

export default router;