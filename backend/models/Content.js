const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['artikel', 'video', 'infografis'], required: true },
  category: {
    type: String,
    enum: ['gizi', 'olahraga', 'kesehatan-mental', 'pencegahan-penyakit'],
    required: true,
  },
  summary: { type: String, required: true },
  body: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
