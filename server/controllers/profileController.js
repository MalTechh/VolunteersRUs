// controllers/profileController.js

import Profile from '../models/Profile.js';

export const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const profile = await Profile.findOne({ userId });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching profile.' });
  }
};

export const createProfile = async (req, res) => {
  const userId = req.user.id;
  const profileData = req.body;
  try {
    const profile = new Profile({ ...profileData, userId });
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
    const profile = await Profile.findOneAndUpdate({ userId }, profileData, { new: true });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Error updating profile.' });
  }
};
