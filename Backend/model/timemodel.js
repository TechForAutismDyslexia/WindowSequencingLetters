
const mongoose = require('mongoose');

const timeDataSchema = new mongoose.Schema({
  timeStarted: Date,
  timeEnded: Date,
  timeTaken: Number,
  tries: Number,
  currentWord: String,
});

module.exports = mongoose.model('TimeData', timeDataSchema);

