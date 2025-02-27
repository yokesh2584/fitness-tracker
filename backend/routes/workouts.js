const express = require('express');
const Workout = require('../models/Workout.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user._id
    });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;