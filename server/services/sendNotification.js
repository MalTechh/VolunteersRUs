// services/sendNotification.js

import sgMail from '@sendgrid/mail';
import config from '../config/config.js';

// Initialize the SendGrid client with the API key
sgMail.setApiKey(config.sendGridApiKey);

export default async function sendNotificationService(userId, message) {
  const msg = {
    to: userId,
    from: 'no-reply@yourdomain.com',
    subject: 'Notification',
    text: message,
    html: `<strong>${message}</strong>`,
  };
  
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
