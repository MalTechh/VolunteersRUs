// controllers/eventController.js

import Event from '../models/Event.js';

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
    const events = await Event.find();
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
