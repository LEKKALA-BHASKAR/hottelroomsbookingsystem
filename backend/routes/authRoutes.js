const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { name, mobile, adhar, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, mobile, adhar, password: hash });
  await user.save();
  res.json({ msg: "User registered successfully" });
});

// Login (User or Admin)
router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  const user = await User.findOne({ mobile });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, isAdmin: user.isAdmin } });
});

module.exports = router;
