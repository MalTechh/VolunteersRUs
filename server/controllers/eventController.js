// controllers/eventController.js

import Event from '../models/EventDetails.js';
import VolunteerHistory from '../models/VolunteerHistory.js';

export const createEvent = async (req, res) => {
  const eventData = req.body;
  try {
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Error creating event.' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching events.' });
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching event.' });
  }
};

export const registerForEvent = async (req, res) => {
    const { eventId } = req.body;
    const userId = req.user.id; 
  
    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      const registration = await VolunteerHistory.create({
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
  const { id } = req.params;
  const eventData = req.body;
  try {
    const event = await Event.findByIdAndUpdate(id, eventData, { new: true });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: 'Error updating event.' });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted.' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting event.' });
  }
};
