// models/VolunteerHistory.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import UserProfile from './UserProfile.js'; // Adjust path as per your structure
import EventDetails from './EventDetails.js'; // Correct import without alias

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
      model: UserProfile,
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

// Define association after both models are initialized
VolunteerHistory.belongsTo(EventDetails, {
  foreignKey: 'EventID',
  targetKey: 'EventID',
  as: 'eventDetails'
});

export default VolunteerHistory; // Ensure export default is used
