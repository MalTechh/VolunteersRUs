// controllers/profileController.js

import UserProfile from '../models/UserProfile.js';

export const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await UserProfile.findOne({ where: { UserID: userId } });

    if (!profile) {
      console.log('Profile not found for userId:', userId);
      return res.status(404).json({ error: 'Profile not found.' });
    }

    // Parse Skills and Availability from JSON strings to arrays
    const skills = JSON.parse(profile.Skills);
    const availability = JSON.parse(profile.Availability);

    // Return profile with parsed arrays
    res.json({ ...profile.toJSON(), Skills: skills, Availability: availability });
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

  console.log("all the body is recieved as stringify in the frontend: ", req.body);
  const newAvailability = JSON.stringify(availability) 
  console.log("availability is JSON.stringify before being created", newAvailability);
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
      Availability: newAvailability,
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

   

    if (profileData.Availability) {
      profileData.Availability = JSON.stringify(profileData.Availability);
    }



    await profile.update(profileData);

    // Fetch the updated profile to respond with the latest data
    const updatedProfile = await UserProfile.findOne({ where: { UserID: userId } });

    // Parse Skills and Availability from JSON strings to arrays
    const skills = JSON.parse(updatedProfile.Skills);
    const availability = JSON.parse(updatedProfile.Availability);

    res.json({ ...updatedProfile.toJSON(), Skills: skills, Availability: availability });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ error: 'Error updating profile.' });
  }
};


