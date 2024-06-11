// controllers/notificationController.js

import Notification from '../models/Notification.js'; // Assuming you have a Notification model
import sendNotificationService from '../services/sendNotification.js'; // Correct import for the default export

export const sendNotification = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    await sendNotificationService(userId, message);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: 'Error sending notification.' });
  }
};
