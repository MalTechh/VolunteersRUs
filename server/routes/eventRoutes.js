// routes/eventRoutes.js

import { Router } from 'express';
import { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/events', authMiddleware, createEvent); // Check
router.delete('/events/:eventId', authMiddleware, deleteEvent); //Check
router.put('/events/:eventId', authMiddleware, updateEvent); // Check
router.get('/events/:eventId', authMiddleware, getEventById); // Check
router.get('/events', authMiddleware, getAllEvents); // Check

export default router;

