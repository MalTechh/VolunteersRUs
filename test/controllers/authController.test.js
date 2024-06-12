import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { register, login, logout } from '../../server/controllers/authController.js';
import UserCredentials from '../../server/models/UserCredentials.js';
import sendVerificationEmail from '../../server/services/sendVerificationEmail.js';

jest.mock('jsonwebtoken');
jest.mock('../../server/services/sendVerificationEmail.js');

describe('Auth Controller', () => {
  let req, res;

  beforeAll(async () => {
    await UserCredentials.create({
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user'
    });
  });

  afterAll(async () => {
    await UserCredentials.destroy({ where: { email: 'test@example.com' } });
  });

  beforeEach(() => {
    req = {
      body: {},
      user: {},
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  test('should register a new user', async () => {
    req.body = { email: 'newuser@example.com', password: 'password123', role: 'user' };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered, verification email sent.' });
    expect(sendVerificationEmail).toHaveBeenCalledWith('newuser@example.com');
  });

  test('should login a user', async () => {
    req.body = { email: 'test@example.com', password: 'password123' };

    jwt.sign.mockReturnValue('fakeToken');

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken' });
  });

  test('should logout a user', () => {
    logout(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Logout successful.' });
  });
});
