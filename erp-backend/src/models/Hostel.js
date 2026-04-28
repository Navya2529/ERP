const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Room = sequelize.define('Room', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },

  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: 'rooms',
  timestamps: true
});

module.exports = Room;