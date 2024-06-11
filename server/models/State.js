// models/State.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const State = sequelize.define('State', {
  code: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default State;
