// src/server/server.js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the frontend build
app.use(express.static('dist'));

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
