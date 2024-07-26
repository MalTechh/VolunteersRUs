import express from 'express';
import request from 'supertest';
import authRoutes from '../../server/routes/authRoutes';
import { register, login, logout, verifyEmail, getUserById } from '../../server/controllers/authController';

jest.mock('../../server/controllers/authController');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should call register controller', async () => {
      register.mockImplementation((req, res) => res.status(201).json({ message: 'User registered' }));

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          passwordhash: 'password123',
          username: 'testuser',
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('User registered');
      expect(register).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /auth/login', () => {
    it('should call login controller', async () => {
      login.mockImplementation((req, res) => res.status(200).json({ message: 'Login successful' }));

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          passwordhash: 'password123',
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login successful');
      expect(login).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /auth/logout', () => {
    it('should call logout controller', async () => {
      logout.mockImplementation((req, res) => res.status(200).json({ message: 'Logout successful' }));

      const res = await request(app)
        .post('/auth/logout');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logout successful');
      expect(logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /auth/verify-email', () => {
    it('should call verifyEmail controller', async () => {
      verifyEmail.mockImplementation((req, res) => res.status(200).json({ message: 'Email verified' }));

      const res = await request(app)
        .post('/auth/verify-email')
        .send({
          token: 'validtoken',
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Email verified');
      expect(verifyEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /auth/user/:userId', () => {
    it('should call getUserById controller', async () => {
      getUserById.mockImplementation((req, res) => res.status(200).json({ username: 'testuser' }));

      const res = await request(app)
        .get('/auth/user/1');

      expect(res.status).toBe(200);
      expect(res.body.username).toBe('testuser');
      expect(getUserById).toHaveBeenCalledTimes(1);
    });
  });
});
