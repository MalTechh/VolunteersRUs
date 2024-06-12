// controllers/authController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserCredentials from '../models/UserCredentials.js';
import sendVerificationEmail from '../services/sendVerificationEmail.js';
import config from '../config/config.js';

const { sign, verify } = jwt;

export const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserCredentials.create({ email, password: hashedPassword, role });
      sendVerificationEmail(user.email);
      res.status(201).json({ message: 'User registered, verification email sent.' });
    } catch (error) {
      res.status(400).json({ error: 'Error registering user.' });
    }
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserCredentials.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: 'Invalid email.' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid password.' });
  
      const token = sign({ userId: user.id, role: user.role }, config.jwtSecret);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in.' });
    }
  };

export const logout = (req, res) => {
  res.json({ message: 'Logout successful.' });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = verify(token, config.jwtSecret);
    const user = await UserCredentials.findByPk(decoded.userId);
    user.isVerified = true;
    await user.save();
    res.json({ message: 'Email verified successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
};
