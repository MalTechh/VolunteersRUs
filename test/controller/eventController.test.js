import { createEvent, getEvents, getEvent, registerForEvent, updateEvent, deleteEvent } from '../../server/controllers/eventController';
import EventDetails from '../../server/models/EventDetails';
import VolunteerHistory from '../../server/models/VolunteerHistory';

jest.mock('../../server/models/EventDetails');
jest.mock('../../server/models/VolunteerHistory');

describe('Event Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      const eventData = { name: 'Test Event', date: '2024-07-20' };
      req.body = eventData;
      EventDetails.prototype.save = jest.fn().mockResolvedValue(eventData);

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should return 400 if there is an error creating the event', async () => {
      req.body = { name: 'Test Event', date: '2024-07-20' };
      EventDetails.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error creating event.' });
    });
  });

  describe('getEvents', () => {
    it('should return all events', async () => {
      const events = [{ name: 'Event 1' }, { name: 'Event 2' }];
      EventDetails.findAll = jest.fn().mockResolvedValue(events);

      await getEvents(req, res);

      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(events);
    });

    it('should return 400 if there is an error fetching events', async () => {
      EventDetails.findAll = jest.fn().mockRejectedValue(new Error('Database error'));

      await getEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching events.' });
    });
  });

  describe('getEvent', () => {
    it('should return an event by ID', async () => {
      const event = { name: 'Test Event' };
      req.params.id = 1;
      EventDetails.findByPk = jest.fn().mockResolvedValue(event);

      await getEvent(req, res);

      expect(res.status).not.toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(event);
    });

    it('should return 404 if the event is not found', async () => {
      req.params.id = 999;
      EventDetails.findByPk = jest.fn().mockResolvedValue(null);

      await getEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found.' });
    });

    it('should return 500 if there is an error fetching the event', async () => {
      req.params.id = 1;
      EventDetails.findByPk = jest.fn().mockRejectedValue(new Error('Database error'));

      await getEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching event.' });
    });
  });

  describe('registerForEvent', () => {
    it('should register a user for an event successfully', async () => {
      req.body.eventId = 1;
      req.user.id = 1;
      const event = { name: 'Test Event' };
      const registration = { userId: 1, eventId: 1, participationStatus: 'Registered' };

      EventDetails.findByPk = jest.fn().mockResolvedValue(event);
      VolunteerHistory.create = jest.fn().mockResolvedValue(registration);

      await registerForEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Registered for event successfully', registration });
    });

    it('should return 404 if the event is not found', async () => {
      req.body.eventId = 999;
      req.user.id = 1;
      EventDetails.findByPk = jest.fn().mockResolvedValue(null);

      await registerForEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found' });
    });

    it('should return 500 if there is an error registering for the event', async () => {
      req.body.eventId = 1;
      req.user.id = 1;
      EventDetails.findByPk = jest.fn().mockRejectedValue(new Error('Database error'));

      await registerForEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error registering for event' });
    });
  });

  describe('updateEvent', () => {
    it('should update an event successfully', async () => {
      req.params.id = 1;
      req.body = { name: 'Updated Event' };
      const event = { name: 'Test Event', update: jest.fn().mockResolvedValue(req.body) };

      EventDetails.findByPk = jest.fn().mockResolvedValue(event);

      await updateEvent(req, res);

      expect(res.status).not.toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event updated successfully.', event });
    });

    it('should return 404 if the event is not found', async () => {
      req.params.id = 999;
      req.body = { name: 'Updated Event' };
      EventDetails.findByPk = jest.fn().mockResolvedValue(null);

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found.' });
    });

    it('should return 500 if there is an error updating the event', async () => {
      req.params.id = 1;
      req.body = { name: 'Updated Event' };
      EventDetails.findByPk = jest.fn().mockRejectedValue(new Error('Database error'));

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error updating event.' });
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event successfully', async () => {
      req.params.id = 1;
      const event = { name: 'Test Event', destroy: jest.fn().mockResolvedValue() };

      EventDetails.findByPk = jest.fn().mockResolvedValue(event);

      await deleteEvent(req, res);

      expect(res.status).not.toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event deleted successfully.' });
    });

    it('should return 404 if the event is not found', async () => {
      req.params.id = 999;
      EventDetails.findByPk = jest.fn().mockResolvedValue(null);

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found.' });
    });

    it('should return 500 if there is an error deleting the event', async () => {
      req.params.id = 1;
      EventDetails.findByPk = jest.fn().mockRejectedValue(new Error('Database error'));

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting event.' });
    });
  });
});
