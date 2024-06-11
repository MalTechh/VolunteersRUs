// controllers/historyController.js

import VolunteerHistory from '../models/VolunteerHistory.js';

export const getHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await VolunteerHistory.find({ userId });
    res.json(history);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching volunteer history.' });
  }
};
