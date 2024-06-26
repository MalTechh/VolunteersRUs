// controllers/matchingController.js


import EventDetails from '../models/EventDetails.js';
import UserProfile from '../models/UserProfile.js';
import UserCredentials from '../models/UserCredentials.js';
import VolunteerHistory from '../models/VolunteerHistory.js';

export const matchVolunteersToEvents = async (req, res) => {
  try {
    const userId = req.body.userId; // User ID of the volunteer

    // Fetch volunteer profile including Skills and Availability
    const volunteerProfile = await UserProfile.findOne({
      where: { UserID: userId },
      attributes: ['Skills', 'Availability']
    });

    if (!volunteerProfile) {
      return res.status(404).json({ error: 'Volunteer profile not found' });
    }

    // Parse Skills
    let userSkills = [];
    try {
      userSkills = JSON.parse(volunteerProfile.Skills); // Assuming Skills is stored as JSON in the database
    } catch (error) {
      console.error('Error parsing user skills:', error);
      return res.status(500).json({ error: 'Error parsing user skills' });
    }

    // Convert Skills to an array of strings
    if (!Array.isArray(userSkills)) {
      userSkills = [userSkills]; // Handle case where Skills is a single string
    }
    userSkills = userSkills.map(skill => skill.trim());

    // Retrieve all events from the database
    const allEvents = await EventDetails.findAll();

    // Filter events based on user skills and availability
    const matchingEvents = allEvents.filter(event => {
      // Parse RequiredSkills of the event
      const requiredSkills = event.RequiredSkills.split(',').map(skill => skill.trim());

      // Check for matching skills
      const hasRequiredSkills = requiredSkills.every(skill => userSkills.includes(skill));
     
      // Check if event.EventDate is included in volunteerProfile.Availability
      const eventDate = new Date(event.EventDate);
      const isAvailable = volunteerProfile.Availability.includes(eventDate.toISOString().split('T')[0]);
      
      
      return hasRequiredSkills && isAvailable;
    });
    

    // Send the matching events as the response
    res.status(200).json({ matchingEvents });
  } catch (error) {
    console.error('Error matching volunteers to events:', error);
    res.status(500).json({ error: 'An error occurred while matching volunteers to events' });
  }
};

export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await UserProfile.findAll({
      include: {
        model: UserCredentials,
        where: { UserType: 'Volunteer' }, // Filter by UserType
        attributes: [] // Exclude all columns from UserCredentials
      },
      attributes: {
        exclude: ['UserId'] // Exclude UserId from UserProfile
      }
    });

    if (!volunteers.length) {
      return res.status(404).json({ message: 'No volunteers found' });
    }

    res.json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ error: 'Error fetching volunteers' });
  }
};

export const submitVolunteerMatch = async (req, res) => {
  try {
    const { userId, eventId } = req.body; // Extract UserID and EventID from request body
    console.log(userId);
    console.log(eventId);
    // Fetch the event date from the EventDetails table using the eventId
    const eventDetails = await EventDetails.findOne({
      where: { EventID: eventId },
      attributes: ['EventDate']
    });

    if (!eventDetails) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Insert the new record into VolunteerHistory table
    const newEntry = await VolunteerHistory.create({
      UserID: userId,
      EventID: eventId,
      ParticipationDate: eventDetails.EventDate, // Use the fetched EventDate
      Status: 'Pending' // Default status
    });
    console.log(newEntry);

    // Return the newly created record as a response
    res.status(201).json({ message: 'Volunteer matched successfully', newEntry });
  } catch (error) {
    console.error('Error inserting volunteer match into history:', error);
    res.status(500).json({ error: 'An error occurred while matching the volunteer to the event' });
  }
};