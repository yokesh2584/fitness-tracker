const express = require('express');
const HealthMetric = require('../models/HealthMetric.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const healthMetric = new HealthMetric({
      ...req.body,
      user: req.user._id
    });
    await healthMetric.save();
    res.status(201).json(healthMetric);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const healthMetrics = await HealthMetric.find({ user: req.user._id });
    res.json(healthMetrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const healthMetric = await HealthMetric.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!healthMetric) {
      return res.status(404).json({ error: 'Health metric not found' });
    }
    res.json({ message: 'Health metric deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;