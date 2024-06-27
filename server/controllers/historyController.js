// controllers/historyController.js

import VolunteerHistory from '../models/VolunteerHistory.js';
import EventDetails from '../models/EventDetails.js';
import UserProfile from '../models/UserProfile.js'; // Import UserProfile model

export const getVolunteerHistory = async (req, res) => {
  const { UserID } = req.body;
  console.log(req.body.UserID);
  try {
    const history = await VolunteerHistory.findAll({
      where: { UserID: UserID },
      include: [
        {
          model: EventDetails,
          as: 'eventDetails', // Alias defined in VolunteerHistory model
          attributes: ['EventName', 'Description', 'Location', 'RequiredSkills', 'Urgency', 'EventDate'],
        }
      ],
      attributes: ['UserID', 'ParticipationDate', 'Status'], // Include attributes from VolunteerHistory
      raw: true // Ensures raw data is fetched
    });

    if (!history.length) {
      return res.status(404).json({ error: 'No volunteer history found.' });
    }

    // Fetch FullName from UserProfile using UserIDs in history
    const userIds = history.map(item => item.UserID);
    const userProfiles = await UserProfile.findAll({
      where: { UserID: userIds },
      attributes: ['UserID', 'FullName']
    });

    // Map history items with FullName from UserProfile
    const formattedHistory = history.map(item => {
      const userProfile = userProfiles.find(profile => profile.UserID === item.UserID);
      return {
        FullName: userProfile ? userProfile.FullName : null,
        EventName: item['eventDetails.EventName'],
        Description: item['eventDetails.Description'],
        Location: item['eventDetails.Location'],
        RequiredSkills: item['eventDetails.RequiredSkills'],
        Urgency: item['eventDetails.Urgency'],
        EventDate: item['eventDetails.EventDate'],
        Status: item.Status // Assuming Status is a field in VolunteerHistory
      };
    });

    res.json({ history: formattedHistory });
  } catch (error) {
    console.error('Error fetching volunteer history:', error);
    res.status(500).json({ error: 'Error fetching volunteer history.' });
  }
};

export default getVolunteerHistory;
