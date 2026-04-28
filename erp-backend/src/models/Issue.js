const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Issue = sequelize.define('Issue', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },

  returnDate: {
    type: DataTypes.DATE
  }

}, {
  tableName: 'issues',   // ✅ ensures Sequelize uses the correct table
  timestamps: true       // because your table has createdAt, updatedAt
});

module.exports = Issue;