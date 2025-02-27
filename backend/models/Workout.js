const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  intensity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  caloriesBurned: { type: Number },
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;