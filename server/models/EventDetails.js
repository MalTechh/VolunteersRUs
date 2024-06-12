// models/Event.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EventDetails = sequelize.define('EventDetails', {
  eventName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  eventDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requiredSkills: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  urgency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATE, // Storing as DATE
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default EventDetails;
