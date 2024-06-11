// routes/historyRoutes.js

import { Router } from 'express';
import { getVolunteerHistory } from '../controllers/historyController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/history/:userId', authMiddleware, getVolunteerHistory);

export default router;
