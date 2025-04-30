import express from 'express';
import { handleCreateAsset } from '../controllers/asset/createAsset.js';
import { handleListAsset } from '../controllers/asset/displayAsset.js';
import { handleDeleteAsset } from '../controllers/asset/deleteAsset.js';
import { handleEditAsset } from '../controllers/asset/editAsset.js';
import { handleGeneratePdf } from '../controllers/asset/generatePDF.js';

const router = express.Router();

router.post('/create', handleCreateAsset); //create asset
router.get('/list', handleListAsset); //display asset list
router.delete('/delete', handleDeleteAsset); //delete asset
router.put('/edit', handleEditAsset); //edit asset
router.get('/pdf', handleGeneratePdf);

export default router;