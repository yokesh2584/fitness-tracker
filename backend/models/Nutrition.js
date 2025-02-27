const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  date: { type: Date, default: Date.now },
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
module.exports = Nutrition;