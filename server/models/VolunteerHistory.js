// models/VolunteerHistory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
      model: 'UserProfile', // Use string if reference is needed before initialization
      key: 'UserID'
    }
  },
  EventID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'EventDetails', // Use string if reference is needed before initialization
      key: 'EventID'
    }
  },
  ParticipationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Status: {
    type: DataTypes.ENUM('Confirmed', 'Pending', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'VolunteerHistory',
  timestamps: false
});

export default VolunteerHistory;