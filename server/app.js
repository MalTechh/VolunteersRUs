// app.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import matchingRoutes from './routes/matchingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import config from './config.js';

// Import models
import './models/User.js';
import './models/Profile.js';
import './models/Event.js';
import './models/VolunteerHistory.js';
import './models/State.js';

const app = express();

mongoose.connect(config.dbUri);

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', eventRoutes);
app.use('/api', matchingRoutes);
app.use('/api', notificationRoutes);
app.use('/api', historyRoutes);

export default app;
