// models/EventDetails.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EventDetails = sequelize.define('EventDetails', {
  EventID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true   
  },
  EventName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Location: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  RequiredSkills: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Urgency: {
    type: DataTypes.ENUM('High', 'Medium', 'Low'),
    allowNull: false
  },
  EventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'EventDetails',
  timestamps: false
});

export default EventDetails;
