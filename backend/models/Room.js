const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: String,
  status: { type: String, default: "available" }, // available / unavailable
  type: String,
  price: Number,
});

module.exports = mongoose.model('Room', roomSchema);
