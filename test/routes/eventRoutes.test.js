import express from 'express';
import request from 'supertest';
import eventRoutes from '../../server/routes/eventRoutes';
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent, registerForEvent } from '../../server/controllers/eventController';
import authMiddleware from '../../server/middlewares/authMiddleware';

jest.mock('../../server/controllers/eventController');
jest.mock('../../server/middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api', eventRoutes);

describe('Event Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authMiddleware.mockImplementation((req, res, next) => next());
  });

  describe('POST /api/events', () => {
    it('should call createEvent controller', async () => {
      createEvent.mockImplementation((req, res) => res.status(201).json({ message: 'Event created' }));

      const res = await request(app)
        .post('/api/events')
        .send({
          EventName: 'New Event',
          eventDescription: 'Event Description',
          location: 'Location',
          requiredSkills: ['Skill1', 'Skill2'],
          urgency: 'High',
          eventDate: '2024-07-20',
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Event created');
      expect(createEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/events/register', () => {
    it('should call registerForEvent controller', async () => {
      registerForEvent.mockImplementation((req, res) => res.status(200).json({ message: 'Registered for event' }));

      const res = await request(app)
        .post('/api/events/register')
        .send({ eventId: 1 });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Registered for event');
      expect(registerForEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/events', () => {
    it('should call getEvents controller', async () => {
      getEvents.mockImplementation((req, res) => res.status(200).json([{ EventName: 'Event 1' }]));

      const res = await request(app)
        .get('/api/events');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ EventName: 'Event 1' }]);
      expect(getEvents).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/events/:id', () => {
    it('should call getEvent controller', async () => {
      getEvent.mockImplementation((req, res) => res.status(200).json({ EventName: 'Event 1' }));

      const res = await request(app)
        .get('/api/events/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ EventName: 'Event 1' });
      expect(getEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/events/:id', () => {
    it('should call updateEvent controller', async () => {
      updateEvent.mockImplementation((req, res) => res.status(200).json({ message: 'Event updated' }));

      const res = await request(app)
        .put('/api/events/1')
        .send({ EventName: 'Updated Event' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Event updated');
      expect(updateEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should call deleteEvent controller', async () => {
      deleteEvent.mockImplementation((req, res) => res.status(200).json({ message: 'Event deleted' }));

      const res = await request(app)
        .delete('/api/events/1');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Event deleted');
      expect(deleteEvent).toHaveBeenCalledTimes(1);
    });
  });
});
