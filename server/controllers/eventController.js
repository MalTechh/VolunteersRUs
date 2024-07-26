// controllers/eventController.js

import EventDetails from '../models/EventDetails.js';


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

export const getEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await EventDetails.findOne({ where: { EventID: eventId } });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return res.status(500).json({ message: 'Failed to fetch event' });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventDetails.findAll();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Failed to fetch events' });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { EventName, Description, Location, RequiredSkills, Urgency, EventDate } = req.body;

  try {
    const [updated] = await EventDetails.update(
      { EventName, Description, Location, RequiredSkills, Urgency, EventDate },
      { where: { EventID: eventId } }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updatedEvent = await EventDetails.findOne({ where: { EventID: eventId } });
    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ message: 'Failed to update event' });
  }
};

export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const deleted = await EventDetails.destroy({ where: { EventID: eventId } });

    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(204).send(); // No content to send back
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ message: 'Failed to delete event' });
  }
};