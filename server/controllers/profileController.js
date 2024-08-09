// controllers/profileController.js

import UserProfile from '../models/UserProfile.js';
import { subDays } from 'date-fns';

export const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await UserProfile.findOne({ where: { UserID: userId } });

    if (!profile) {
      console.log('Profile not found for userId:', userId);
      return res.status(404).json({ error: 'Profile not found.' });
    }
    console.log("before JSON parse", profile.Availability);
    // Parse Skills and Availability from JSON strings to arrays
    const skills = profile.Skills ? JSON.parse(profile.Skills) : [];
    const availability = profile.Availability ? JSON.parse(profile.Availability) : [];
    console.log("after JSON parse", availability);
    // Return profile with parsed arrays
    res.status(200).json({ ...profile.toJSON(), Skills: skills, Availability: availability });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
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
      Availability: JSON.stringify(availability), // Convert array to JSON string
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
    const profile = await UserProfile.findOne({ where: { UserID: userId } });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    console.log("update before stringify: ", profileData.Availability);
    if (profileData.skills) {
      profileData.Skills = JSON.stringify(profileData.Skills);
    }

    console.log('Availability before update:', profileData.Availability); // Log the original array

    if (profileData.Availability) { 
      profileData.Availability = JSON.stringify(profileData.Availability);
      console.log('Availability after stringification:', profileData.Availability); // Log after stringify
    }


    await profile.update(profileData);

    // Fetch the updated profile to respond with the latest data
    const updatedProfile = await UserProfile.findOne({ where: { UserID: userId } });

    // Parse Skills and Availability from JSON strings to arrays
    const skills = updatedProfile.Skills ? JSON.parse(updatedProfile.Skills) : [];
    const availability = updatedProfile.Availability ? JSON.parse(updatedProfile.Availability) : [];

    res.status(200).json({ ...updatedProfile.toJSON(), Skills: skills, Availability: availability });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ error: 'Error updating profile.' });
  }
};
