import express from 'express';
import request from 'supertest';
import matchingRoutes from '../../server/routes/matchingRoutes';
import { matchVolunteersToEvents, getAllVolunteers, submitVolunteerMatch } from '../../server/controllers/matchingController';
import authMiddleware from '../../server/middlewares/authMiddleware';

jest.mock('../../server/controllers/matchingController');
jest.mock('../../server/middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api', matchingRoutes);

describe('Matching Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authMiddleware.mockImplementation((req, res, next) => next());
  });

  describe('POST /api/matching', () => {
    it('should call matchVolunteersToEvents controller', async () => {
      matchVolunteersToEvents.mockImplementation((req, res) => res.status(200).json({ matchedEvents: [] }));

      const res = await request(app)
        .post('/api/matching')
        .send({ userId: 1 });

      expect(res.status).toBe(200);
      expect(res.body.matchedEvents).toEqual([]);
      expect(matchVolunteersToEvents).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .post('/api/matching')
        .send({ userId: 1 });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(matchVolunteersToEvents).not.toHaveBeenCalled();
    });
  });

  describe('GET /api/volunteers', () => {
    it('should call getAllVolunteers controller', async () => {
      getAllVolunteers.mockImplementation((req, res) => res.status(200).json([{ FullName: 'Volunteer 1' }]));

      const res = await request(app)
        .get('/api/volunteers');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ FullName: 'Volunteer 1' }]);
      expect(getAllVolunteers).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .get('/api/volunteers');

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(getAllVolunteers).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/submitmatch', () => {
    it('should call submitVolunteerMatch controller', async () => {
      submitVolunteerMatch.mockImplementation((req, res) => res.status(201).json({ message: 'Volunteer matched successfully' }));

      const res = await request(app)
        .post('/api/submitmatch')
        .send({ userId: 1, eventId: 1 });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Volunteer matched successfully');
      expect(submitVolunteerMatch).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .post('/api/submitmatch')
        .send({ userId: 1, eventId: 1 });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(submitVolunteerMatch).not.toHaveBeenCalled();
    });
  });
});
