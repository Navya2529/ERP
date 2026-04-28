const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FeeTransaction = sequelize.define(
  'FeeTransaction',
  {
    fee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },

    payment_date: {
      type: DataTypes.DATE
    },

    payment_status: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'fees',
    timestamps: false
  }
);

module.exports = FeeTransaction;