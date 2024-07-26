import express from 'express';
import request from 'supertest';
import historyRoutes from '../../server/routes/historyRoutes';
import { getVolunteerHistory } from '../../server/controllers/historyController';
import authMiddleware from '../../server/middlewares/authMiddleware';

jest.mock('../../server/controllers/historyController');
jest.mock('../../server/middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api', historyRoutes);

describe('History Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authMiddleware.mockImplementation((req, res, next) => next());
  });

  describe('POST /api/history', () => {
    it('should call getVolunteerHistory controller', async () => {
      getVolunteerHistory.mockImplementation((req, res) => res.status(200).json({ history: [] }));

      const res = await request(app)
        .post('/api/history')
        .send({ UserID: 1 });

      expect(res.status).toBe(200);
      expect(res.body.history).toEqual([]);
      expect(getVolunteerHistory).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .post('/api/history')
        .send({ UserID: 1 });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(getVolunteerHistory).not.toHaveBeenCalled();
    });
  });
});
