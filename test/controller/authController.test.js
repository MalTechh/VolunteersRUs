import { register, login, logout, verifyEmail, getUserById } from '../../server/controllers/authController';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserCredentials from '../../server/models/UserCredentials';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../server/models/UserCredentials');
jest.mock('../../server/config/config', () => ({
  jwtSecret: 'testsecret'
}));

describe('Auth Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      req.body = {
        email: 'test@example.com',
        passwordhash: 'password123',
        username: 'testuser'
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      UserCredentials.create.mockResolvedValue({ UserID: 1, UserType: 'User', email: req.body.email, username: req.body.username, passwordhash: 'hashedPassword' });
      jwt.sign.mockReturnValue('token');

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should return 400 if email, password, or username is missing', async () => {
      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email, password, and username are required.' });
    });

    it('should return 400 if there is an error creating the user', async () => {
      req.body = {
        email: 'test@example.com',
        passwordhash: 'password123',
        username: 'testuser'
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      UserCredentials.create.mockRejectedValue(new Error('Database error'));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error registering user.' });
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      req.body = {
        email: 'test@example.com',
        passwordhash: 'password123'
      };

      UserCredentials.findOne.mockResolvedValue({ UserID: 1, UserType: 'User', email: req.body.email, username: 'testuser', passwordhash: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');

      await login(req, res);

      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successful!', token: 'token' });
    });

    it('should return 400 if credentials are invalid', async () => {
      req.body = {
        email: 'test@example.com',
        passwordhash: 'wrongpassword'
      };

      UserCredentials.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials.' });
    });

    it('should return 500 if there is an error during login', async () => {
      req.body = {
        email: 'test@example.com',
        passwordhash: 'password123'
      };

      UserCredentials.findOne.mockRejectedValue(new Error('Database error'));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error logging in.' });
    });
  });

  describe('logout', () => {
    it('should log out a user successfully', () => {
      logout(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Logout successful.' });
    });
  });

  describe('verifyEmail', () => {
    it('should verify the email successfully', async () => {
      req.body = { token: 'validtoken' };

      jwt.verify.mockReturnValue({ userId: 1 });
      UserCredentials.findByPk.mockResolvedValue({ userId: 1, isVerified: false, save: jest.fn() });

      await verifyEmail(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Email verified successfully.' });
    });

    it('should return 400 if the token is invalid or expired', async () => {
      req.body = { token: 'invalidtoken' };

      jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

      await verifyEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token.' });
    });
  });

  describe('getUserById', () => {
    it('should return user data for a valid userId', async () => {
      req.params.userId = 1;

      UserCredentials.findByPk.mockResolvedValue({ username: 'testuser' });

      await getUserById(req, res);

      expect(res.status).not.toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ username: 'testuser' });
    });

    it('should return 404 if the user is not found', async () => {
      req.params.userId = 999;

      UserCredentials.findByPk.mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
    });

    it('should return 500 if there is an error fetching the user', async () => {
      req.params.userId = 1;

      UserCredentials.findByPk.mockRejectedValue(new Error('Database error'));

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error.' });
    });
  });
});
