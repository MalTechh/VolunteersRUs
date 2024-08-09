// routes/historyRoutes.js

import { Router } from 'express';
import { getVolunteerHistory, fetchVolunteerInfo, fetchEventInfo } from '../controllers/historyController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/history', authMiddleware, getVolunteerHistory);
router.get('/fetchVolunteerInfo', authMiddleware, fetchVolunteerInfo)
router.get('/fetchEventInfo', authMiddleware, fetchEventInfo)

export default router;
