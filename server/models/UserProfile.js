// models/UserProfile.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import UserCredentials from './UserCredentials.js';

const UserProfile = sequelize.define('UserProfile', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'UserCredentials',
      key: 'UserID'
    }
  },
  FullName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Address1: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Address2: {
    type: DataTypes.STRING(100),
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  State: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  ZipCode: {
    type: DataTypes.STRING(9),
    allowNull: false
  },
  Skills: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Preferences: {
    type: DataTypes.TEXT
  },
  Availability: {
    type: DataTypes.TEXT,
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
  tableName: 'UserProfile',
  timestamps: false
});

UserProfile.belongsTo(UserCredentials, { foreignKey: 'UserID' });

export default UserProfile;