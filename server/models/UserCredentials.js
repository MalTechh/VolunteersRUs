// models/UserCredentials.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserCredentials = sequelize.define('UserCredentials', {
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  passwordhash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  UserType: {
    type: DataTypes.ENUM('Volunteer', 'Administrator'),
    defaultValue: 'Volunteer', // Default value set to 'Volunteer'
    allowNull: false, // Assuming UserType is required
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'UserCredentials',
  timestamps: false, // Assuming you handle timestamps manually
});

export default UserCredentials;