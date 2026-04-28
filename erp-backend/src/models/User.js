const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {

  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.ENUM(
      'ADMIN',
      'WARDEN',
      'ACCOUNTANT',
      'LIBRARIAN',
      'STUDENT'
    ),
    allowNull: false
  }

}, {
  tableName: 'users',
  timestamps: false
});

User.prototype.matchPassword = async function(password) {
  return password === this.password;
};

module.exports = User;