const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Allocation = sequelize.define('Allocation', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: 'allocations',
  timestamps: false
});

module.exports = Allocation;