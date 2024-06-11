// models/VolunteerHistory.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Event from './Event.js';

const VolunteerHistory = sequelize.define('VolunteerHistory', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
    allowNull: false,
  },
  participationStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(VolunteerHistory, { foreignKey: 'userId' });
Event.hasMany(VolunteerHistory, { foreignKey: 'eventId' });
VolunteerHistory.belongsTo(User, { foreignKey: 'userId' });
VolunteerHistory.belongsTo(Event, { foreignKey: 'eventId' });

export default VolunteerHistory;
