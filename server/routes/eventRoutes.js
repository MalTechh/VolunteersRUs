// routes/eventRoutes.js

import { Router } from 'express';
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/events', authMiddleware, createEvent);
router.get('/events', authMiddleware, getEvents);
router.get('/events/:id', authMiddleware, getEvent);
router.put('/events/:id', authMiddleware, updateEvent);
router.delete('/events/:id', authMiddleware, deleteEvent);

export default router;
