// server.js

import app from './app.js';
import process from 'process';
import sequelize from './config/database.js';
import './models/associations.js'; 

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});