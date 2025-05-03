import express from 'express';
import { handleCreateAsset } from '../controllers/asset/createAsset.js';
import { handleListAsset } from '../controllers/asset/listAsset.js';
import { handleDeleteAsset } from '../controllers/asset/deleteAsset.js';
import { handleEditAsset } from '../controllers/asset/editAsset.js';
import { handleGeneratePdf } from '../controllers/asset/generatePDF.js';
import { handleGetAsset } from '../controllers/asset/getAsset.js';
import { handleListAssetByStatusId } from '../controllers/asset/listAssetByStatus.js';

const router = express.Router();

router.post('/create', handleCreateAsset); //create asset
router.get('/list', handleListAsset); //display asset list
router.post('/get', handleGetAsset); //get asset by id
router.post('/listbyid', handleListAssetByStatusId);
router.delete('/delete', handleDeleteAsset); //delete asset
router.put('/edit', handleEditAsset); //edit asset
router.get('/pdf', handleGeneratePdf);

export default router;