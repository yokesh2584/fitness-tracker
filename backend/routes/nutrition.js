const express = require('express');
const Nutrition = require('../models/Nutrition.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const nutrition = new Nutrition({
      ...req.body,
      user: req.user._id
    });
    await nutrition.save();
    res.status(201).json(nutrition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const nutritionEntries = await Nutrition.find({ user: req.user._id });
    res.json(nutritionEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;