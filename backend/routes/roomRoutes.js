const express = require('express');
const Room = require('../models/Room');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Get all rooms
router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

// Admin update room status
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;
  const room = await Room.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(room);
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { number, type, price, status } = req.body;
  const room = new Room({ number, type, price, status });
  await room.save();
  res.json(room);
});

// Edit a room
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedRoom);
});

// Delete a room
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Room deleted successfully' });
});


module.exports = router;
