// controllers/authController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserCredentials from '../models/UserCredentials.js';
import sendVerificationEmail from '../services/sendVerificationEmail.js';
import config from '../config/config.js';

const { sign, verify } = jwt;

export const register = async (req, res) => {
  const { email, passwordhash, username } = req.body;

  if (!email || !passwordhash || !username) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordhash, 10);

    // Create the user in the database
    const user = await UserCredentials.create({ email, passwordhash: hashedPassword, username });

    // Respond with success message
    
    const token = sign({ UserID: user.UserID }, config.jwtSecret);
    
    res.json({ token });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'Error registering user.' });
  }
};

export const login = async (req, res) => {
  const { email, passwordhash } = req.body;

  try {

    const user = await UserCredentials.findOne({ where: { email } });
 
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(passwordhash, user.passwordhash);
  
   
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const token = sign({ userId: user.UserID }, config.jwtSecret);
    res.json({ message: 'Login successful!', token });
    
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


export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserCredentials.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ username: user.username }); // Send back the username
   
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};