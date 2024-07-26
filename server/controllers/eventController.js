// controllers/eventController.js

import EventDetails from '../models/EventDetails.js';
import VolunteerHistory from '../models/VolunteerHistory.js'

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
    // Delete related volunteer history first
    await VolunteerHistory.destroy({
      where: { EventID: eventId }
    });

    // Then delete the event
    await EventDetails.destroy({
      where: { EventID: eventId }
    });

    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ message: 'Error deleting event', error });
  }
};
