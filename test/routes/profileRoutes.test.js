import express from 'express';
import request from 'supertest';
import profileRoutes from '../../server/routes/profileRoutes';
import { getProfile, createProfile, updateProfile } from '../../server/controllers/profileController';
import authMiddleware from '../../server/middlewares/authMiddleware';

jest.mock('../../server/controllers/profileController');
jest.mock('../../server/middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api', profileRoutes);

describe('Profile Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authMiddleware.mockImplementation((req, res, next) => next());
  });

  describe('GET /api/profile', () => {
    it('should call getProfile controller', async () => {
      getProfile.mockImplementation((req, res) => res.status(200).json({ FullName: 'Test User' }));

      const res = await request(app)
        .get('/api/profile');

      expect(res.status).toBe(200);
      expect(res.body.FullName).toBe('Test User');
      expect(getProfile).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .get('/api/profile');

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(getProfile).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/profile', () => {
    it('should call createProfile controller', async () => {
      createProfile.mockImplementation((req, res) => res.status(201).json({ message: 'Profile created' }));

      const res = await request(app)
        .post('/api/profile')
        .send({
          fullName: 'John Doe',
          address1: '123 Main St',
          address2: '',
          city: 'Sample City',
          state: 'CA',
          zipCode: '12345',
          skills: ['Skill1', 'Skill2'],
          preferences: 'None',
          availability: ['2024-07-20']
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Profile created');
      expect(createProfile).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .post('/api/profile')
        .send({
          fullName: 'John Doe',
          address1: '123 Main St',
          address2: '',
          city: 'Sample City',
          state: 'CA',
          zipCode: '12345',
          skills: ['Skill1', 'Skill2'],
          preferences: 'None',
          availability: ['2024-07-20']
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(createProfile).not.toHaveBeenCalled();
    });
  });

  describe('PUT /api/profile', () => {
    it('should call updateProfile controller', async () => {
      updateProfile.mockImplementation((req, res) => res.status(200).json({ message: 'Profile updated' }));

      const res = await request(app)
        .put('/api/profile')
        .send({
          fullName: 'John Doe',
          address1: '456 Main St',
          address2: 'Apt 1',
          city: 'New City',
          state: 'NY',
          zipCode: '54321',
          skills: ['Skill3', 'Skill4'],
          preferences: 'Some preferences',
          availability: ['2024-08-20']
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Profile updated');
      expect(updateProfile).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if authMiddleware fails', async () => {
      authMiddleware.mockImplementation((req, res) => res.status(401).json({ error: 'Unauthorized access.' }));

      const res = await request(app)
        .put('/api/profile')
        .send({
          fullName: 'John Doe',
          address1: '456 Main St',
          address2: 'Apt 1',
          city: 'New City',
          state: 'NY',
          zipCode: '54321',
          skills: ['Skill3', 'Skill4'],
          preferences: 'Some preferences',
          availability: ['2024-08-20']
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized access.');
      expect(authMiddleware).toHaveBeenCalledTimes(1);
      expect(updateProfile).not.toHaveBeenCalled();
    });
  });
});
