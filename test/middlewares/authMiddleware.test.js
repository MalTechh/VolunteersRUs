import jwt from 'jsonwebtoken';
import authMiddleware from '../../server/middlewares/authMiddleware.js';

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: jest.fn().mockReturnValue('Bearer token'),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  test('should call next if token is valid', () => {
    jest.spyOn(jwt, 'verify').mockReturnValue({ userId: 1 });
    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should return 401 if no token is provided', () => {
    req.header.mockReturnValue(null);
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized access.' });
  });

  test('should return 401 if token is invalid', () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => { throw new Error('Invalid token'); });
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token.' });
  });
});
