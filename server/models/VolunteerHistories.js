// models/VolunteerHistory.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import UserCredentials from './UserCredentials.js';
import EventDetails from './EventDetails.js';

const VolunteerHistory = sequelize.define('VolunteerHistory', {
  ParticipationID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'UserProfile', // table name
          key: 'UserID'
      }
  },
  EventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'EventDetails', // table name
          key: 'EventID'
      }
  },
  ParticipationDate: {
      type: DataTypes.DATE,
      allowNull: false
  },
  Role: {
      type: DataTypes.STRING(50),
      allowNull: false
  },
  Status: {
      type: DataTypes.ENUM('Confirmed', 'Pending', 'Cancelled'),
      allowNull: false
  },
  CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'VolunteerHistory',
  timestamps: false // because CreatedAt is handled manually
});

export default VolunteerHistory
