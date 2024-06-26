// controllers/profileController.js

import UserProfile from '../models/UserProfile.js';
import pool from '../config/database.js';
export const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const profile = await UserProfile.findOne({ userId });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching profile.' });
  }
};

export const createProfile = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is obtained from authentication middleware

  const {
    fullName,
    address1,
    address2,
    city,
    state,
    zipCode,
    skills,
    preferences,
    availability,
  } = req.body;

  try {
    const profile = await UserProfile.create({
      UserID: userId, // Make sure this matches the column name in your model
      FullName: fullName,
      Address1: address1,
      Address2: address2,
      City: city,
      State: state,
      ZipCode: zipCode,
      Skills: JSON.stringify(skills), // Convert array to JSON string
      Preferences: preferences,
      Availability: JSON.stringify(availability) // Convert array to JSON string
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(400).json({ error: 'Error creating profile.' });
  }
};
export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const profileData = req.body;
  
    try {
      const profile = await UserProfile.findOne({ where: { userId } });
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      await profile.update(profileData);
  
      res.json(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(400).json({ error: 'Error updating profile.' });
    }
  };
