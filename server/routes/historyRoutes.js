// routes/historyRoutes.js

import { Router } from 'express';
import { getVolunteerHistory } from '../controllers/historyController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/history', authMiddleware, getVolunteerHistory);

export default router;
