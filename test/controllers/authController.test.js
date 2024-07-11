import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { register, login, logout, verifyEmail } from '../../server/controllers/authController.js';
import UserCredentials from '../../server/models/UserCredentials.js';

jest.mock('jsonwebtoken');
jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => Promise.resolve('hashedpassword123')),
}));
jest.mock('../../server/models/UserCredentials.js');
jest.mock('../../server/services/sendVerificationEmail.js');

describe('Auth Controller', () => {
  let req, res;

  beforeAll(async () => {
    await UserCredentials.create({
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      isVerified: true,
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
    const req = {
      body: {
        email: 'test@example.com',
        passwordhash: 'password123',
        username: 'testuser',
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    
    bcrypt.hash.mockResolvedValue('hashedpassword123');
    UserCredentials.create.mockResolvedValue({
      email: req.body.email,
      UserID: 1,
      UserType: 'user',
    });
    jwt.sign.mockReturnValue('testtoken');

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ token: 'testtoken' });
  });

  test('should login a user', async () => {
    req.body = { email: 'test@example.com', password: 'password123' };

    jwt.sign.mockReturnValue('fakeToken');

    await login(req, res);

    expect(res.json).toHaveBeenCalled();    // Ensure json response was set
  });

  test('should logout a user', () => {
    logout(req, res);

    expect(res.json).toHaveBeenCalled();    // Ensure json response was set
  });

  test('should verify a user email', async () => {
    jwt.verify.mockReturnValue({ userId: 1 });

    req.body = { token: 'fakeToken' };

    await verifyEmail(req, res);

    expect(res.json).toHaveBeenCalled();    // Ensure json response was set
  });
});