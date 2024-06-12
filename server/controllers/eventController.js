// controllers/eventController.js

import EventDetails from '../models/EventDetails.js';
import VolunteerHistories from '../models/VolunteerHistories.js';

export const createEvent = async (req, res) => {
  const eventData = req.body;
  try {
    const event = new EventDetails(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Error creating event.' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await EventDetails.findAll();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching events.' });
  }
};

export const getEvent = async (req, res) => {
    try {
      const event = await EventDetails.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching event.' });
    }
  };
  

export const registerForEvent = async (req, res) => {
    const { eventId } = req.body;
    const userId = req.user.id; 
  
    try {
      const event = await EventDetails.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      const registration = await VolunteerHistories.create({
        userId,
        eventId,
        participationStatus: 'Registered'
      });
  
      res.status(201).json({ message: 'Registered for event successfully', registration });
    } catch (error) {
      res.status(500).json({ error: 'Error registering for event' });
    }
  };

  export const updateEvent = async (req, res) => {
    try {
      const event = await EventDetails.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }
      await event.update(req.body);
      res.json({ message: 'Event updated successfully.', event });
    } catch (error) {
      res.status(500).json({ error: 'Error updating event.' });
    }
  };
  

  export const deleteEvent = async (req, res) => {
    try {
      const event = await EventDetails.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }
      await event.destroy();
      res.json({ message: 'Event deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting event.' });
    }
  };  
