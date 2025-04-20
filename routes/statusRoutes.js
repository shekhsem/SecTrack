import express from 'express';
import { handleCreateStatuses } from '../controllers/status/createStatus.js';

const router = express.Router();

router.post('/create', handleCreateStatuses); //delete and create stasuses

export default router;