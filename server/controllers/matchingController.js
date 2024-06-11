// controllers/matchingController.js

import Profile from '../models/Profile.js';
import Event from '../models/Event.js';

export const matchVolunteers = async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    const volunteers = await Profile.find({
      skills: { $in: event.requiredSkills },
      availability: { $in: [event.eventDate] }
    });
    res.json(volunteers);
  } catch (error) {
    res.status(400).json({ error: 'Error matching volunteers.' });
  }
};
