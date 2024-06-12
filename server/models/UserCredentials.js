import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

const UserCredentials = sequelize.define('UserCredentials', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',
  },
});

export default UserCredentials;
