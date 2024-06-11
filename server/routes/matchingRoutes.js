// routes/matchingRoutes.js

import { Router } from 'express';
import { matchVolunteers } from '../controllers/matchingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/match-volunteers', authMiddleware, matchVolunteers);

export default router;
