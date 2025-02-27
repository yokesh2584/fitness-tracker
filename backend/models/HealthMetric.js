const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number },
  bmi: { type: Number },
  hydrationLevel: { type: Number },
  date: { type: Date, default: Date.now },
});

const HealthMetric = mongoose.model('HealthMetric', healthMetricSchema);
module.exports = HealthMetric;