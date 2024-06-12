// controllers/profileController.js

import UserProfile from '../models/UserProfile.js';

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
  const userId = req.user.id;
  const profileData = req.body;
  try {
    const profile = new UserProfile({ ...profileData, userId });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
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
