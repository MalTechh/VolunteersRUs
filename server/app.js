// app.js

import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import matchingRoutes from './routes/matchingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

const app = express();

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', eventRoutes);
app.use('/api', matchingRoutes);
app.use('/api', notificationRoutes);
app.use('/api', historyRoutes);

export default app;
