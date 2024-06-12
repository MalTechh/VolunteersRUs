// routes/matchingRoutes.js

import { Router } from 'express';
import { matchVolunteersToEvents } from '../controllers/matchingController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/matching', authMiddleware, matchVolunteersToEvents);

export default router;
