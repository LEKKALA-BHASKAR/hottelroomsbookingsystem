const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const Room = require('../models/Room');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Create booking
router.post('/', async (req, res) => {
  const { userId, roomId } = req.body;
  const booking = new Booking({ userId, roomId });
  await booking.save();
  res.json({ msg: "We will confirm your booking within 1-2 hrs." });
});

// Admin - get all bookings
router.get('/all', async (req, res) => {
  const bookings = await Booking.find().populate('roomId userId');
  res.json(bookings);
});

// Get bookings for a specific user
router.get('/user/:id', async (req, res) => {
  const bookings = await Booking.find({ userId: req.params.id }).populate('roomId');
  res.json(bookings);
});



// Admin - confirm booking
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

  if (status === 'confirmed') {
    const user = await User.findById(booking.userId);
    const room = await Room.findById(booking.roomId);
    await sendEmail(user.mobile + "bassnaidu1242@mailinator.com", user.name, room.number);
  }

  res.json(booking);
});


router.post('/', authMiddleware, async (req, res) => {
  const booking = new Booking({ userId: req.user._id, roomId: req.body.roomId });
  await booking.save();
  res.json({ msg: "We will confirm your booking within 1–2 hours!" });
});

router.get('/user/:id', authMiddleware, async (req, res) => {
  if (req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ msg: "Unauthorized access" });
  }
  const bookings = await Booking.find({ userId: req.params.id }).populate('roomId');
  res.json(bookings);
});

router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  const bookings = await Booking.find().populate('roomId userId');
  res.json(bookings);
});

router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(booking);
});



module.exports = router;
