import express from 'express';
import request from 'supertest';
import notificationRoutes from '../../server/routes/notificationRoutes';
import { sendNotification } from '../../server/controllers/notificationController';
import authMiddleware from '../../server/middlewares/authMiddleware';

jest.mock('../../server/controllers/notificationController');
jest.mock('../../server/middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api', notificationRoutes);

describe('Notification Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authMiddleware.mockImplementation((req, res, next) => next());
  });

  describe('POST /api/notifications', () => {
    it('should call sendNotification controller', async () => {
      sendNotification.mockImplementation((req, res) => res.status(201).json({ message: 'Notification sent' }));

      const res = await request(app)
        .post('/api/notifications')
        .send({ userId: 1, message: 'Test notification' });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Notification sent');
      expect(sendNotification).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .post('/api/notifications')
        .send({ userId: 1, message: 'Test notification' });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(sendNotification).not.toHaveBeenCalled();
    });
  });
});
