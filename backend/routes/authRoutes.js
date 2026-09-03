const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET, verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin, isSuperuser: user.isSuperuser }, SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin, isSuperuser: user.isSuperuser } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSuperuser: user.isSuperuser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.update({ name, email }, { where: { id: req.userId } });
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
