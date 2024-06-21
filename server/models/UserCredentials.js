// models/UserCredentials.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserCredentials = sequelize.define('UserCredentials', {
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
 
});

export default UserCredentials;
