// routes/notificationRoutes.js

import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/notify', authMiddleware, sendNotification);

export default router;
