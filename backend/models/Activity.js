const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['air-minum', 'olahraga', 'tidur', 'mood', 'berat-badan'],
    required: true,
  },
  value: { type: String, required: true },
  notes: { type: String, default: '' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
