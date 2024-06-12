// models/VolunteerHistory.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import UserCredentials from './UserCredentials.js';
import EventDetails from './EventDetails.js';

const VolunteerHistories = sequelize.define('VolunteerHistories', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserCredentials,
      key: 'id',
    },
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: EventDetails,
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

UserCredentials.hasMany(VolunteerHistories, { foreignKey: 'userId' });
EventDetails.hasMany(VolunteerHistories, { foreignKey: 'eventId' });
VolunteerHistories.belongsTo(UserCredentials, { foreignKey: 'userId' });
VolunteerHistories.belongsTo(EventDetails, { foreignKey: 'eventId' });

export default VolunteerHistories;
