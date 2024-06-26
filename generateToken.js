// generateToken.js
import jwt from 'jsonwebtoken';

// Define your secret key
const secretKey = 'your_jwt_secret';

// Define the payload
const payload = {
  id: 123,               // Example user ID
  name: 'John Doe',      // Example name
  role: 'user'           // Example role
};

// Options for the token
const options = {
  expiresIn: '1h'        // Token expiration (e.g., 1 hour)
};

// Generate the token
const token = jwt.sign(payload, secretKey, options);

console.log('Generated JWT:', token);
