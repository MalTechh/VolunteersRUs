import request from 'supertest';
import app from '../../server/app.js';
import * as authController from '../../server/controllers/authController.js';
import jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../server/controllers/authController.js'); // Mock the authController module

describe('Auth Routes', () => {
  let token;

  beforeAll(() => {
    // Mock token generation
    token = jwt.sign({ UserID: 1, UserType: 'user' }, 'testsecret');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should register a new user', async () => {
    // Mock the register function
    authController.register.mockImplementation((req, res) => {
      res.status(201).json({ message: 'User registered, verification email sent.' });
    });

    const response = await request(app)
      .post('/api/register')
      .send({ email: 'newuser@example.com', passwordhash: 'password123', username: 'testuser' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered, verification email sent.');
  });

  test('should login a user', async () => {
    // Mock the login function
    authController.login.mockImplementation((req, res) => {
      res.status(200).json({ token: 'testtoken' });
    });

    const response = await request(app)
      .post('/api/login')
      .send({ email: 'newuser@example.com', passwordhash: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should logout a user', async () => {
    // Mock the logout function
    authController.logout.mockImplementation((req, res) => {
      res.status(200).json({ message: 'Logout successful.' });
    });

    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logout successful.');
  });
});
