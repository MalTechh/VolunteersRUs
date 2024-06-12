// controllers/historyController.js

import VolunteerHistories from '../models/VolunteerHistories.js';
import EventDetails from '../models/EventDetails.js';

export const getVolunteerHistory = async (req, res) => {
  const userId = req.user.id; // Assuming user id is available in req.user

  try {
    const history = await VolunteerHistories.findAll({
      where: { userId },
      include: [{
        model: EventDetails,
        attributes: ['eventName', 'eventDescription', 'location', 'eventDate', 'requiredSkills', 'urgency'],
      }]
    });

    if (!history.length) {
      return res.status(404).json({ error: 'No volunteer history found.' });
    }

    res.json({ history });
  } catch (error) {
    console.error('Error fetching volunteer history:', error);
    res.status(500).json({ error: 'Error fetching volunteer history.' });
  }
};
