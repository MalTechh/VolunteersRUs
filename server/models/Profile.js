// models/Profile.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Profile = sequelize.define('Profile', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
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
    type: DataTypes.JSON,
    allowNull: false,
  },
});

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

export default Profile;
