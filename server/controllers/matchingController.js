// controllers/matchingController.js

import { Op } from 'sequelize';
import Event from '../models/EventDetails.js';
import Profile from '../models/UserProfile.js';

export const matchVolunteers = async (req, res) => {
  const userId = req.user.id; // Assuming user id is available in req.user

  try {
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const userSkills = profile.skills; // assuming skills is an array
    const userAvailability = profile.availability.map(date => new Date(date).toISOString()); // Normalize dates

    console.log('User Skills:', userSkills);
    console.log('User Availability:', userAvailability);

    // Find events that match both skills and availability
    let matchingEvents = await Event.findAll({
      where: {
        [Op.and]: [
          {
            requiredSkills: { [Op.overlap]: userSkills }
          },
          {
            eventDate: { [Op.in]: userAvailability }
          }
        ]
      }
    });

    // If no exact matches, find events that match availability only
    if (matchingEvents.length === 0) {
      matchingEvents = await Event.findAll({
        where: {
          eventDate: { [Op.in]: userAvailability }
        }
      });
    }

    console.log('Matching Events:', matchingEvents);

    res.json({ matchingEvents });
  } catch (error) {
    console.error('Error matching volunteers to events:', error);
    res.status(500).json({ error: 'Error matching volunteers to events' });
  }
};
