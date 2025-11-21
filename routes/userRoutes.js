const express = require('express');
// creates a new router object 
//lets you write seperate route logic into different files
const router = express.Router(); 
const bcrypt = require('bcrypt'); // bcrypt for password hashing
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10); // password hashing using bcrypt with 10 salt rounds
    // hashing is one way
    const user = await User.create({ name, email, password: hashed });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
