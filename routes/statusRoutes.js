import express from 'express';
import { handleCreateStatuses } from '../controllers/status/createStatus.js';
import { handleListStatuses } from '../controllers/status/listStatus.js';

const router = express.Router();

router.post('/create', handleCreateStatuses); //initiate status database
router.get('/list', handleListStatuses); //list existing statuses

export default router;