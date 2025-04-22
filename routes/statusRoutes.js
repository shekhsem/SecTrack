import express from 'express';
import { handleCreateStatuses } from '../controllers/status/createStatus.js';
import { handleDisplayStatuses } from '../controllers/status/displayStatus.js';

const router = express.Router();

router.post('/create', handleCreateStatuses); //initiate status database
router.get('/display', handleDisplayStatuses); //display existing statuses

export default router;