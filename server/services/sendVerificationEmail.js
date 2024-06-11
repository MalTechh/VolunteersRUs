// services/sendVerificationEmail.js

import sgMail from '@sendgrid/mail';
import config from '../config/config.js';

// Initialize the SendGrid client with the API key
sgMail.setApiKey(config.sendGridApiKey);

export default async function sendVerificationEmail(email) {
  const msg = {
    to: email,
    from: 'no-reply@yourdomain.com',
    subject: 'Email Verification',
    text: 'Please verify your email by clicking the link below.',
    html: '<strong>Please verify your email by clicking the link below.</strong>',
  };
  
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
