// controllers/authController.js

import bcrypt from 'bcryptjs'; // Change to bcryptjs
import jwt from 'jsonwebtoken';
import UserCredentials from '../models/UserCredentials.js';
import config from '../config/config.js';

const { sign, verify } = jwt;

// Registration handler
export const register = async (req, res) => {
  const { email, passwordhash, username, admin } = req.body;

  // Basic validation
  if (!email || !passwordhash || !username) {
    return res.status(400).json({ error: 'Email, password, and username are required.' });
  }

  const UserType = admin === 1 ? 'Administrator' : 'Volunteer';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordhash, 10);

    // Create the user in the database
    const user = await UserCredentials.create({
      email,
      passwordhash: hashedPassword,
      username,
      UserType,
    });


    // Retrieve the UserType from the newly created user
    const userType = user.UserType;

    // Sign the token with UserID and UserType
    const token = sign({ UserID: user.UserID, UserType: user.UserType }, config.jwtSecret);
   

    // Respond with the token
    res.status(201).json({ token });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'Error registering user.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body; // Change to password to reflect raw password input

  try {
    // Find the user by email
    const user = await UserCredentials.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordhash);

    // Check if the password is valid
    if (!isPasswordValid) {

      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Retrieve the UserType from the user
    const userType = user.UserType;

    // Sign the token with UserID and UserType
    const token = sign({ UserID: user.UserID, UserType: userType }, config.jwtSecret);

    // Respond with a success message and the token
    res.json({ message: 'Login successful!', token });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in.' });
  }
};

// Other functions remain the same...

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
