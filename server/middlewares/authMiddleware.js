import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import UserCredentials from '../models/UserCredentials.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    const user = await UserCredentials.findByPk(req.user.userId);
    if (!user) return res.status(401).json({ error: 'Invalid token.' });

    req.user.role = user.role;
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied.' });
  }
  next();
};
