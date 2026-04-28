const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Fine = sequelize.define('Fine', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  issueId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  amount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },

  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'fines',
  timestamps: false
});

module.exports = Fine;