const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exam = sequelize.define('Exam', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  examName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  examDate: {
    type: DataTypes.DATE
  }

});

module.exports = Exam;