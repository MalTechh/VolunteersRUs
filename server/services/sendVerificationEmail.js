// services/sendVerificationEmail.js

import sgMail from '@sendgrid/mail';
import config from '../config/config.js';

sgMail.setApiKey(config.sendGridApiKey);

const sendVerificationEmail = async (to, token) => {
  const msg = {
    to,
    from: 'malachirichlin@gmail.com', // Use a verified sender
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: ${token}`,
    html: `<p>Please verify your email by clicking the following link: <a href="${token}">${token}</a></p>`,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('Verification email sent successfully.', response);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid response error:', error.response.body);
    }
  }
};

export default sendVerificationEmail;
