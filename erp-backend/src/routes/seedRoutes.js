const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/admin', async (req, res) => {
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@test.com',
    password: '123456',
    role: 'ADMIN'
  });

  res.json(admin);
});

router.post('/warden', async (req, res) => {
  const warden = await User.create({
    name: 'Warden',
    email: 'warden@test.com',
    password: '123456',
    role: 'WARDEN'
  });

  res.json(warden);
});

router.post('/accountant', async (req, res) => {
  const accountant = await User.create({
    name: 'Accountant',
    email: 'accountant@test.com',
    password: '123456',
    role: 'ACCOUNTANT'
  });

  res.json(accountant);
});

router.post('/librarian', async (req, res) => {
  const librarian = await User.create({
    name: 'Librarian',
    email: 'librarian@test.com',
    password: '123456',
    role: 'LIBRARIAN'
  });

  res.json(librarian);
});

module.exports = router;