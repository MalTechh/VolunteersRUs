// models/Profile.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import UserCredentials from './UserCredentials.js';

const UserProfile = sequelize.define('UserProfile', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserCredentials,
      key: 'id',
    },
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address1: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address2: {
    type: DataTypes.STRING(100),
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  preferences: {
    type: DataTypes.TEXT,
  },
  availability: {
    type: DataTypes.JSON, // Storing as JSON array of ISO 8601 strings
    allowNull: false,
  },
});

UserCredentials.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(UserCredentials, { foreignKey: 'userId' });

export default UserProfile;
