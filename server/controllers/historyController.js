// controllers/historyController.js

import VolunteerHistory from '../models/VolunteerHistory.js';
import EventDetails from '../models/EventDetails.js';
import UserProfile from '../models/UserProfile.js'; // Import UserProfile model

export const getVolunteerHistory = async (req, res) => {
  const { UserID } = req.body;
  
  console.log('Received UserID:', UserID);
  
  // Check if UserID is valid
  if (!UserID) {
    return res.status(400).json({ error: 'UserID is required.' });
  }

  try {
    // Fetch volunteer history with associated event details
    const history = await VolunteerHistory.findAll({
      where: { UserID: UserID },
      include: [
        {
          model: EventDetails,
          as: 'eventDetails',
          attributes: ['EventName', 'Description', 'Location', 'RequiredSkills', 'Urgency', 'EventDate'],
        }
      ],
      attributes: ['Status', 'UserID'], // Fetch Status and UserID for later mapping
      raw: true // Fetch raw data without complex nested structure
    });

    console.log('Fetched Volunteer History:', history);

    if (!history.length) {
      return res.status(404).json({ error: 'No volunteer history found.' });
    }

    // Extract unique UserIDs from the history data
    const userIds = [...new Set(history.map(item => item.UserID))];

    // Fetch user profiles for the relevant UserIDs
    const userProfiles = await UserProfile.findAll({
      where: { UserID: userIds },
      attributes: ['UserID', 'FullName']
    });

    console.log('Fetched User Profiles:', userProfiles);

    // Map the fetched history and user profiles into a structured response
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
        Status: item.Status
      };
    });

    // Send the structured response
    res.status(200).json({ history: formattedHistory });
  } catch (error) {
    console.error('Error fetching volunteer history:', error);
    res.status(500).json({ error: 'Error fetching volunteer history.' });
  }
};


export const fetchVolunteerInfo = async (req, res) => {

  try {
    // Fetch all volunteer history
    const history = await VolunteerHistory.findAll({
      include: [
        {
          model: EventDetails,
          as: 'eventDetails',
          attributes: ['EventName', 'Description', 'Location', 'RequiredSkills', 'Urgency', 'EventDate'],
        }
      ],
      attributes: ['Status', 'UserID'], // Fetch Status and UserID for later mapping
      raw: true // Fetch raw data without complex nested structure
    });

    console.log('Fetched Volunteer History for all users:', history);

    if (!history.length) {
      return res.status(404).json({ error: 'No volunteer history found.' });
    }

    // Extract unique UserIDs from the history data
    const userIds = [...new Set(history.map(item => item.UserID))];

    // Fetch user profiles for the relevant UserIDs
    const userProfiles = await UserProfile.findAll({
      where: { UserID: userIds },
      attributes: ['UserID', 'FullName']
    });

    console.log('Fetched User Profiles:', userProfiles);

    // Map the fetched history and user profiles into a structured response
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
        Status: item.Status
      };
    });

    // Send the structured response
    res.status(200).json({ history: formattedHistory });
  } catch (error) {
    console.error('Error fetching volunteer history:', error);
    res.status(500).json({ error: 'Error fetching volunteer history.' });
  }
};

export const fetchEventInfo = async (req, res) => {

  try {
    // Fetch all volunteer history
    const history = await VolunteerHistory.findAll({
      include: [
        {
          model: EventDetails,
          as: 'eventDetails',
          attributes: ['EventName', 'Description', 'Location', 'RequiredSkills', 'Urgency', 'EventDate'],
        }
      ],
      attributes: ['Status', 'UserID'], // Fetch Status and UserID for later mapping
      raw: true // Fetch raw data without complex nested structure
    });

    console.log('Fetched Volunteer History for all users:', history);

    if (!history.length) {
      return res.status(404).json({ error: 'No volunteer history found.' });
    }

    // Extract unique UserIDs from the history data
    const userIds = [...new Set(history.map(item => item.UserID))];

    // Fetch user profiles for the relevant UserIDs
    const userProfiles = await UserProfile.findAll({
      where: { UserID: userIds },
      attributes: ['UserID', 'FullName']
    });

    console.log('Fetched User Profiles:', userProfiles);

    // Map the fetched history and user profiles into a structured response
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
        Status: item.Status
      };
    });

    // Send the structured response
    res.status(200).json({ history: formattedHistory });
  } catch (error) {
    console.error('Error fetching volunteer history:', error);
    res.status(500).json({ error: 'Error fetching volunteer history.' });
  }



}