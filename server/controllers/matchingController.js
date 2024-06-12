// controllers/matchingController.js

import { Op } from 'sequelize';
import EventDetails from '../models/EventDetails.js';
import UserProfile from '../models/UserProfile.js';

export const matchVolunteersToEvents = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await UserProfile.findOne({ where: { userId } });
  
      if (!user) {
        return res.status(404).json({ error: 'User profile not found.' });
      }
  
      const userSkills = user.skills;
      const userAvailability = user.availability;
  
      const matchingEvents = await EventDetails.findAll({
        where: {
          [Op.or]: [
            {
              requiredSkills: { [Op.overlap]: userSkills },
              eventDate: { [Op.in]: userAvailability }
            },
            {
              eventDate: { [Op.in]: userAvailability }
            }
          ]
        }
      });
      res.json(matchingEvents);
    } catch (error) {
      res.status(500).json({ error: 'Error matching volunteers to events.' });
    }
  };
  