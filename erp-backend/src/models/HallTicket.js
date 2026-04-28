const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Registration = require('./Registration');

const HallTicket = sequelize.define('HallTicket', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  registrationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  hallTicketNumber: {
    type: DataTypes.STRING
  }

}, {
  tableName: 'halltickets',
  timestamps: true
});

HallTicket.belongsTo(Registration, {
  foreignKey: 'registrationId'
});

Registration.hasOne(HallTicket, {
  foreignKey: 'registrationId'
});

module.exports = HallTicket;