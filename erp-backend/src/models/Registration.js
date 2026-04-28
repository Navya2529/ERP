const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Registration = sequelize.define('Registration', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  examId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: 'registrations',
  timestamps: true
});

module.exports = Registration;