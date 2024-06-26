// routes/matchingRoutes.js

import { Router } from 'express';
import { matchVolunteersToEvents, getAllVolunteers, submitVolunteerMatch } from '../controllers/matchingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Route to get matched events for the logged-in user
router.post('/matching', authMiddleware, matchVolunteersToEvents);

// Route to get all volunteers
router.get('/volunteers', authMiddleware, getAllVolunteers);

// Route to insert the UserID and the EventID into the VolunteerHistory table. This will also use the EventID to retrieve the EventDate from the EventDetails table and store it into the VolunteerHistory table.
router.post('/submitmatch', authMiddleware, submitVolunteerMatch);

export default router;
