import express from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import { createEvent, updateEvent, deleteEvent, getEvents, getEvent, registerForEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/events', authMiddleware, adminMiddleware, createEvent);
router.get('/events', authMiddleware, getEvents);
router.get('/events/:id', authMiddleware, getEvent);
router.put('/events/:id', authMiddleware, adminMiddleware, updateEvent);
router.delete('/events/:id', authMiddleware, adminMiddleware, deleteEvent);
router.post('/events/:id/register', authMiddleware, registerForEvent);

export default router;
